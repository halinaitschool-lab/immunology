export { metadata, viewport } from "next-sanity/studio";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        height: "100dvh",
        overflow: "hidden",
        background: "#fff",
      }}
    >
      {children}
    </div>
  );
}
