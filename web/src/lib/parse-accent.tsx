import { Fragment, type ReactNode } from "react";

/** Renders *accent* segments as italic emphasis. */
export function parseAccent(text: string): ReactNode[] {
  return text.split(/(\*[^*]+\*)/g).map((part, index) => {
    if (part.startsWith("*") && part.endsWith("*")) {
      return <em key={index}>{part.slice(1, -1)}</em>;
    }
    return <Fragment key={index}>{part}</Fragment>;
  });
}
