import { About } from "@/components/sections/About";
import { Brands } from "@/components/sections/Brands";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { Metrics } from "@/components/sections/Metrics";
import { Portfolio } from "@/components/portfolio/Portfolio";
import { Services } from "@/components/sections/Services";
import { CONTACT } from "@/config/contact";
import { SITE } from "@/config/site";

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Priscila Almeida",
    url: SITE.url,
    jobTitle: "Influenciadora digital e criadora de conteúdo UGC",
    sameAs: [CONTACT.instagram],
    description: SITE.description,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <Hero />
      <About />
      <Metrics />
      <Services />
      <Portfolio />
      <Brands />
      <Contact />
    </>
  );
}
