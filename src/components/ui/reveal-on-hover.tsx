"use client";

import * as React from "react";
import { cn } from "../../lib/utils";

interface CardHoverRevealContextValue {
  isHovered: boolean;
  setIsHovered: React.Dispatch<React.SetStateAction<boolean>>;
  prefersHover: boolean;
}

const CardHoverRevealContext = React.createContext<CardHoverRevealContextValue>(
  {} as CardHoverRevealContextValue
);

const useCardHoverRevealContext = () => {
  const context = React.useContext(CardHoverRevealContext);
  if (!context) {
    throw new Error(
      "useCardHoverRevealContext must be used within a CardHoverRevealProvider"
    );
  }
  return context;
};

const CardHoverReveal = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const [isHovered, setIsHovered] = React.useState<boolean>(false);
  const [prefersHover, setPrefersHover] = React.useState(true);

  React.useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    const handler = (event: MediaQueryListEvent) => setPrefersHover(event.matches);

    setPrefersHover(media.matches);
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, []);

  return (
    <CardHoverRevealContext.Provider value={{ isHovered, setIsHovered, prefersHover }}>
      <div
        ref={ref}
        className={cn("relative overflow-hidden", className)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
        {...props}
      />
    </CardHoverRevealContext.Provider>
  );
});
CardHoverReveal.displayName = "CardHoverReveal";

interface CardHoverRevealMainProps {
  initialScale?: number;
  hoverScale?: number;
}

const CardHoverRevealMain = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CardHoverRevealMainProps
>(({ className, initialScale = 1, hoverScale = 1.05, ...props }, ref) => {
  const { isHovered, prefersHover } = useCardHoverRevealContext();
  const shouldScale = prefersHover && isHovered;
  const scale = shouldScale ? hoverScale : initialScale;

  return (
    <div
      ref={ref}
      className={cn("size-full transition-transform duration-300", className)}
      style={{ transform: `scale(${scale})`, ...props.style }}
      {...props}
    />
  );
});
CardHoverRevealMain.displayName = "CardHoverRevealMain";

const CardHoverRevealContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { isHovered, prefersHover } = useCardHoverRevealContext();
  const isVisible = prefersHover ? isHovered : true;

  return (
    <div
      ref={ref}
      className={cn(
        "absolute inset-[auto_1.25rem_1.25rem] p-5 backdrop-blur-xl transition-all duration-350 ease-out",
        className
      )}
      style={
        isVisible
          ? { translate: "0%", opacity: 1, ...props.style }
          : { translate: "0% 120%", opacity: 0, ...props.style }
      }
      {...props}
    />
  );
});
CardHoverRevealContent.displayName = "CardHoverRevealContent";

export { CardHoverReveal, CardHoverRevealMain, CardHoverRevealContent };
