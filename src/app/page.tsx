import { About } from "@/components/sections/About";
import { Brands } from "@/components/sections/Brands";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { Metrics } from "@/components/sections/Metrics";
import { Portfolio } from "@/components/portfolio/Portfolio";
import { Services } from "@/components/sections/Services";
import { SITE } from "@/config/site";
import { getHomeContent } from "@/sanity/content";

export default async function Home() {
  const content = await getHomeContent();
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE.personName,
    url: SITE.url,
    jobTitle: "Influenciadora digital e criadora de conteúdo UGC",
    sameAs: [content.settings.instagram, content.settings.tiktok].filter(Boolean),
    description: content.settings.description,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <Hero settings={content.settings} />
      {content.settings.sectionVisibility.about !== false && <About profileImage={content.settings.profileImage} profileImageAlt={content.settings.profileImageAlt} />}
      {content.settings.sectionVisibility.metrics !== false && <Metrics />}
      {content.settings.sectionVisibility.services !== false && <Services items={content.services} />}
      {content.settings.sectionVisibility.portfolio !== false && <Portfolio items={content.portfolio} />}
      {content.settings.sectionVisibility.brands !== false && <Brands items={content.brands} />}
      {content.settings.sectionVisibility.contact !== false && <Contact settings={content.settings} />}
    </>
  );
}
