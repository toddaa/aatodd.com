import { ImageResponse } from "next/og";

export const alt = "About Aaron Todd - Full-Stack Software Engineer from Michigan";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const runtime = "edge";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          background: "#09090b",
          padding: "80px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 20,
            fontFamily: "monospace",
            color: "#6b6b76",
            marginBottom: 24,
          }}
        >
          <span style={{ color: "#00ffaa" }}>$</span>
          <span style={{ marginLeft: 8 }}>whoami</span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          <span
            style={{
              fontSize: 96,
              fontWeight: 700,
              color: "#fafafa",
              lineHeight: 1,
            }}
          >
            Aaron Todd
          </span>
          <span
            style={{
              fontSize: 36,
              fontWeight: 400,
              color: "#00ffaa",
              lineHeight: 1.2,
              marginTop: 16,
            }}
          >
            Full-Stack Software Engineer
          </span>
          <span
            style={{
              fontSize: 28,
              fontWeight: 400,
              color: "#6b6b76",
              lineHeight: 1.2,
              marginTop: 8,
            }}
          >
            Michigan, USA
          </span>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 20,
            fontFamily: "monospace",
            color: "#00ffaa",
            marginTop: 48,
          }}
        >
          &gt; aatodd.com/about
        </div>
      </div>
    ),
    { ...size }
  );
}
