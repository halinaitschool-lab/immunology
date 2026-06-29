import { redirect } from "next/navigation";

const STUDIO_URL =
  process.env.NEXT_PUBLIC_SANITY_STUDIO_URL ?? "https://immunology.sanity.studio";

export default function StudioPage() {
  redirect(STUDIO_URL);
}
