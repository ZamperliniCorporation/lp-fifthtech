import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

function toBase64(buffer: ArrayBuffer) {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

export default async function OpenGraphImage() {
  const title = "FifthTech";
  const subtitle = "Soluções digitais sob medida";
  const url = "fifthtech.vercel.app";

  const logoFile = new URL("../public/images/logo.png", import.meta.url);
  const logoBuffer = await fetch(logoFile).then((res) => res.arrayBuffer());
  const logoSrc = `data:image/png;base64,${toBase64(logoBuffer)}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#050607",
          position: "relative",
          overflow: "hidden",
          fontFamily:
            'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Arial',
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -220,
            left: "50%",
            transform: "translateX(-50%)",
            width: 980,
            height: 520,
            borderRadius: 9999,
            background:
              "radial-gradient(circle at 50% 0%, rgba(255,255,255,0.22), rgba(255,255,255,0.06) 45%, transparent 72%)",
            filter: "blur(28px)",
            opacity: 0.9,
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(1100px circle at 50% 40%, transparent 28%, rgba(0,0,0,0.92) 78%)",
          }}
        />

        <div
          style={{
            width: 980,
            display: "flex",
            alignItems: "center",
            gap: 28,
            padding: 56,
            borderRadius: 28,
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.10)",
            boxShadow: "0 30px 120px rgba(0,0,0,0.65)",
            backdropFilter: "blur(14px)",
          }}
        >
          <div
            style={{
              width: 120,
              height: 120,
              borderRadius: 24,
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: -30,
                background:
                  "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.20), transparent 55%)",
                filter: "blur(18px)",
                opacity: 0.7,
              }}
            />
            <img src={logoSrc} width={84} height={84} style={{ objectFit: "contain", opacity: 0.98 }} />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div
              style={{
                fontSize: 64,
                fontWeight: 700,
                letterSpacing: -1.2,
                color: "rgba(255,255,255,0.96)",
                lineHeight: 1,
              }}
            >
              {title}
            </div>

            <div
              style={{
                fontSize: 26,
                fontWeight: 500,
                color: "rgba(255,255,255,0.70)",
                lineHeight: 1.35,
                maxWidth: 720,
              }}
            >
              {subtitle}
            </div>

            <div
              style={{
                marginTop: 10,
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <div
                style={{
                  padding: "10px 14px",
                  borderRadius: 9999,
                  border: "1px solid rgba(255,255,255,0.12)",
                  background: "rgba(255,255,255,0.05)",
                  color: "rgba(255,255,255,0.72)",
                  fontSize: 18,
                  fontWeight: 600,
                }}
              >
                Software • Apps • Automações • Integrações
              </div>

              <div
                style={{
                  color: "rgba(255,255,255,0.45)",
                  fontSize: 18,
                  fontWeight: 500,
                }}
              >
                {url}
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    size
  );
}
