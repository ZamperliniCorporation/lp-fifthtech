"use client";

import * as React from "react";
import { motion, Variants } from "framer-motion";
import { cn } from "../../lib/utils";

interface AnimatedTextProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
  gradientColors?: string;
  gradientAnimationDuration?: number;
  hoverEffect?: boolean;
  className?: string;
  textClassName?: string;
}

const AnimatedText = React.forwardRef<HTMLDivElement, AnimatedTextProps>(
  (
    {
      text,
      gradientColors = "linear-gradient(90deg, #ffffff, #dbe8ff, #ffffff)",
      gradientAnimationDuration = 1.2,
      hoverEffect = true,
      className,
      textClassName,
      ...props
    },
    ref
  ) => {
    const textVariants: Variants = {
      initial: {
        backgroundPosition: "0% 0%",
      },
      animate: {
        backgroundPosition: "200% 0%",
        transition: {
          duration: gradientAnimationDuration,
          repeat: Infinity,
          repeatType: "reverse",
        },
      },
    };

    return (
      <motion.div
        ref={ref}
        className={cn("inline-flex items-center", className)}
        initial="initial"
        animate="initial"
        whileHover={hoverEffect ? "animate" : "initial"}
        {...props}
      >
        <motion.span
          variants={textVariants}
          className={cn("inline-block text-transparent", textClassName)}
          style={{
            backgroundImage: gradientColors,
            backgroundSize: "200% 100%",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            color: "transparent",
          }}
        >
          {text}
        </motion.span>
      </motion.div>
    );
  }
);

AnimatedText.displayName = "AnimatedText";

export { AnimatedText };
export default AnimatedText;
