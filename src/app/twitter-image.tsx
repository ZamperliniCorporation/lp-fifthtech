import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 600,
};

export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "600px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#050607",
        }}
      >
        <div
          style={{
            width: 1040,
            height: 460,
            borderRadius: 28,
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.10)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 20,
          }}
        >
          <img
            src="https://fifthtech.vercel.app/images/logo.png"
            width={110}
            height={110}
            style={{ objectFit: "contain" }}
          />
          <div
            style={{
              fontSize: 62,
              fontWeight: 800,
              letterSpacing: -1.2,
              color: "rgba(255,255,255,0.96)",
            }}
          >
            FifthTech
          </div>
        </div>
      </div>
    ),
    size
  );
}
