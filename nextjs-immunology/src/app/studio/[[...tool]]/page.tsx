"use client";

import { NextStudio } from "next-sanity/studio";
import studioConfig from "@/sanity/studioConfig";

export default function StudioPage() {
  return <NextStudio config={studioConfig} />;
}
