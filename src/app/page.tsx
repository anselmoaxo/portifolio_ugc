import { About } from "@/components/sections/About";
import { Brands } from "@/components/sections/Brands";
import { Contact } from "@/components/sections/Contact";
import { Differentials } from "@/components/sections/Differentials";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { Hero } from "@/components/sections/Hero";
import { InstagramGallery } from "@/components/sections/InstagramGallery";
import { InstagramReels } from "@/components/sections/InstagramReels";
import { Portfolio } from "@/components/portfolio/Portfolio";
import { Services } from "@/components/sections/Services";
import { Testimonials } from "@/components/sections/Testimonials";
import { WorkProcess } from "@/components/sections/WorkProcess";
import { CONTACT } from "@/config/contact";
import { SITE } from "@/config/site";

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Priscila",
    url: SITE.url,
    jobTitle: "Criadora de conteúdo UGC",
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
      <Differentials />
      <Services />
      <Portfolio />
      <InstagramReels />
      <InstagramGallery />
      <Brands />
      <FeaturedWork />
      <WorkProcess />
      <Testimonials />
      <Contact />
    </>
  );
}
