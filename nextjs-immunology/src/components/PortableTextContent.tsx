import type { ReactNode } from "react";
import { PortableText, type PortableTextBlock } from "next-sanity";

const components = {
  block: {
    normal: ({ children }: { children?: ReactNode }) => <p>{children}</p>,
    h2: ({ children }: { children?: ReactNode }) => <h2 className="pt-h2">{children}</h2>,
    h3: ({ children }: { children?: ReactNode }) => <h3 className="pt-h3">{children}</h3>,
  },
  list: {
    bullet: ({ children }: { children?: ReactNode }) => <ul>{children}</ul>,
    number: ({ children }: { children?: ReactNode }) => <ol>{children}</ol>,
  },
  marks: {
    link: ({
      children,
      value,
    }: {
      children?: ReactNode;
      value?: { href?: string };
    }) => (
      <a href={value?.href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
  },
};

export function PortableTextContent({
  value,
  className,
}: {
  value?: PortableTextBlock[];
  className?: string;
}) {
  if (!value?.length) return null;
  return (
    <div className={className}>
      <PortableText value={value} components={components} />
    </div>
  );
}
