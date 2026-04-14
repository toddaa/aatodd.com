import { ImageResponse } from "next/og";

export const alt = "Aaron Todd. Build. Break. Ship.";
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
          <span style={{ marginLeft: 8 }}>cat /dev/mind</span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          <span
            style={{
              fontSize: 72,
              fontWeight: 700,
              color: "#00ffaa",
              lineHeight: 1,
            }}
          >
            Build.
          </span>
          <span
            style={{
              fontSize: 72,
              fontWeight: 700,
              color: "#6b6b76",
              lineHeight: 1,
            }}
          >
            Break.
          </span>
          <span
            style={{
              fontSize: 72,
              fontWeight: 700,
              color: "#fafafa",
              lineHeight: 1,
            }}
          >
            Ship.
          </span>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 24,
            color: "#6b6b76",
            marginTop: 40,
          }}
        >
          <span style={{ color: "#fafafa", fontWeight: 700 }}>Aaron Todd</span>
          <span style={{ marginLeft: 12 }}>
            | Full-stack software engineer
          </span>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 18,
            fontFamily: "monospace",
            color: "#00ffaa",
            marginTop: 16,
          }}
        >
          &gt; aatodd.com
        </div>
      </div>
    ),
    { ...size }
  );
}
