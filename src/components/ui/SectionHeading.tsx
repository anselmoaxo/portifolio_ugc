type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  light?: boolean;
  align?: "left" | "center";
};

export function SectionHeading({ eyebrow, title, description, light, align = "left" }: Props) {
  return (
    <div className={`section-heading ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow && <p className={`eyebrow ${light ? "text-rose-200" : "text-rose-700"}`}>{eyebrow}</p>}
      <h2 className={`display-title mt-4 ${light ? "text-cream" : "text-ink"}`}>{title}</h2>
      {description && <p className={`mt-5 max-w-2xl text-base leading-7 md:text-lg ${light ? "text-white/70" : "text-muted"}`}>{description}</p>}
    </div>
  );
}
