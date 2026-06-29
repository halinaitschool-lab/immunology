"use client";

import { useState } from "react";
import { PortableTextContent } from "@/components/PortableTextContent";
import type { GuideFaqItem } from "@/lib/guide";

export function GuideFaqList({
  items,
  showMoreLabel,
}: {
  items: GuideFaqItem[];
  showMoreLabel: string;
}) {
  const [visible, setVisible] = useState(4);
  const shown = items.slice(0, visible);

  return (
    <>
      <div className="guide-faq-list">
        {shown.map((item, index) => (
          <details key={`${item.question}-${index}`} className="guide-faq-item">
            <summary>
              <span>{item.question}</span>
              <span className="guide-faq-icon" aria-hidden>
                +
              </span>
            </summary>
            <div className="guide-faq-answer">
              <PortableTextContent value={item.answer} />
            </div>
          </details>
        ))}
      </div>
      {visible < items.length && (
        <button type="button" className="guide-link-more" onClick={() => setVisible(items.length)}>
          {showMoreLabel}
        </button>
      )}
    </>
  );
}
