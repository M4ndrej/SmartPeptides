import AboutUs from "@/components/AboutUs/AboutUs";
import { WithContext } from "schema-dts";

export const metadata = {
  title: "About Us",
  description: "About Us",
  ...(process.env.ENVIRONMENT === "production" && {
    alternates: {
      canonical: `/about/`,
    },
  }),
};

export default async function AboutPage() {
  const jsonLd: WithContext<any> = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://valuepeptide.com//#organization",
        name: "Value Peptide",
        url: "https://valuepeptide.com/",
        logo: "https://valuepeptide.com//images/logo.svg",
        description:
          "Leading provider of high-quality research peptides and peptide blends for scientific research and development.",
        address: { "@type": "PostalAddress", addressCountry: "US" },
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer service",
          url: "https://valuepeptide.com//contact",
        },
        sameAs: [
          "https://www.facebook.com/profile.php?id=61577011570165",
          "https://www.instagram.com/peptide.city/",
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://valuepeptide.com//#website",
        url: "https://valuepeptide.com/",
        name: "Value Peptide",
        publisher: {
          "@id": "https://valuepeptide.com//#organization",
        },
        inLanguage: "en-US",
      },
      {
        "@type": "ImageObject",
        "@id": "/images/aboutImg.svg",
        url: "/images/aboutImg.svg",
        width: "526",
        height: "729",
        inLanguage: "en-US",
      },
      {
        "@type": "WebPage",
        "@id": "https://valuepeptide.com//about/#webpage",
        url: "https://valuepeptide.com//about/",
        name: "About Us - Value Peptide",
        description:
          "Read everything about valuepeptide.com and find out why are we the best in the business.",
        datePublished: "2019-10-21T07:35:49-05:00",
        dateModified: "2023-11-06T16:23:30-06:00",
        isPartOf: {
          "@id": "https://valuepeptide.com//#website",
        },
        primaryImageOfPage: {
          "@id": "/images/aboutImg.svg",
        },
        inLanguage: "en-US",
        about: {
          "@id": "https://valuepeptide.com//#organization",
        },
      },
      {
        "@type": "AboutPage",
        "@id": "https://valuepeptide.com//about/#aboutpage",
        url: "https://valuepeptide.com//about/",
        name: "About Us - Value Peptide",
        description:
          "Read everything about valuepeptide.com and find out why are we the best in the business.",
        mainEntity: {
          "@id": "https://valuepeptide.com//#organization",
        },
        isPartOf: {
          "@id": "https://valuepeptide.com//about/#webpage",
        },
        inLanguage: "en-US",
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://valuepeptide.com//about/#breadcrumb",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://valuepeptide.com//",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "About Us",
            item: "https://valuepeptide.com//about/",
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="container-padding-inline container-margin-bottom-D96px-M64px mx-auto flex max-w-[1264px] flex-col gap-[64px] pt-[48px] sm:gap-[40px]">
        <div className="flex flex-col items-center gap-[24px] text-center">
          <h1 className="font-D32px-M24px flex flex-col items-center justify-center gap-[16px]  font-bold">
            About Us <div className="h-[2px] w-[48px] bg-[#E7461E]"></div>
          </h1>
          <p className="font-D16px-M13px">
            Read everything about valuepeptide.com and find out why are we the
            best in the business.
          </p>
        </div>
        <AboutUs />
      </div>
    </>
  );
}
