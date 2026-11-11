/* SectionCard — ყველა section-ის wrapper კომპონენტი */
import React from 'react';

export default function SectionCard({ id, title, children }) {
  return (
    <section id={id}>
      {title && <h2>{title}</h2>}
      {children}
    </section>
  );
}

