import { PortableText, type SanityDocument } from "next-sanity";
import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { client } from "@/sanity/client";
import { getPostBySlug } from "@/lib/content";

type Locale = "uk" | "en";

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset ? createImageUrlBuilder({ projectId, dataset }).image(source) : null;

export async function PostPage({ slug, locale }: { slug: string; locale: Locale }) {
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const imageUrl = post.image ? urlFor(post.image)?.width(1200).height(700).url() : null;
  const backHref = locale === "uk" ? "/" : "/en";
  const backLabel = locale === "uk" ? "На головну" : "Back to home";

  return (
    <main className="post-page">
      <Link href={backHref} className="post-back">
        {backLabel}
      </Link>
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={post.title}
          className="post-image"
          width={1200}
          height={700}
          unoptimized
        />
      )}
      <h1>{post.title}</h1>
      <p className="post-date">
        {new Date(post.publishedAt).toLocaleDateString(locale === "uk" ? "uk-UA" : "en-US")}
      </p>
      <article className="post-body">
        {Array.isArray((post as SanityDocument).body) && (
          <PortableText value={(post as SanityDocument).body} />
        )}
      </article>
    </main>
  );
}
