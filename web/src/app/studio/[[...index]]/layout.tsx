export { metadata, viewport } from "next-sanity/studio";

export const dynamic = "force-dynamic";

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ position: "fixed", inset: 0, margin: 0, padding: 0, overflow: "hidden" }}>
      {children}
    </div>
  );
}
