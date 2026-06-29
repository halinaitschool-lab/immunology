import { readFile } from "node:fs/promises";
import { LANDING_HTML_PATH, patchLandingHtml } from "@/lib/patchLandingHtml";

export const dynamic = "force-dynamic";

export default async function IndexPageEn() {
  const html = await readFile(LANDING_HTML_PATH, "utf8").catch(() => null);

  if (!html) {
    return (
      <main
        style={{
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          padding: "2rem",
        }}
      >
        <div>
          <h1>Failed to read HTML file</h1>
          <p>Check path: {LANDING_HTML_PATH}</p>
        </div>
      </main>
    );
  }

  const patchedHtml = patchLandingHtml(html, { defaultLang: "en" });

  return (
    <main style={{ minHeight: "100vh" }}>
      <iframe
        title="Lilya Nesterovska landing EN"
        srcDoc={patchedHtml}
        style={{ width: "100%", minHeight: "100vh", border: "none" }}
      />
    </main>
  );
}
