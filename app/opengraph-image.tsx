import { ImageResponse } from "next/og";
import { site } from "../content/site";

export const dynamic = "force-static";
export const alt = `${site.name}, full-stack engineer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** The footer wordmark, as a card: lime ground, giant name cropped by the bottom edge. */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#8dff4f",
          color: "#0e1a06",
          padding: "56px 64px 0",
        }}
      >
        <div style={{ fontSize: 40, fontWeight: 600, display: "flex" }}>One VPS. No cloud provider.</div>
        <div style={{ fontSize: 400, fontWeight: 800, letterSpacing: -16, lineHeight: 0.8, marginBottom: -40, display: "flex" }}>
          {site.name}
        </div>
      </div>
    ),
    size,
  );
}
