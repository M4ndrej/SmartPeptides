import FaqPage from "@/components/Faq/Faq";
import { FAQS_DATA } from "@/data/faqs_data";
import { Metadata, ResolvingMetadata } from "next";
import { WithContext } from "schema-dts";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  return {
    title: "FAQ's",
    description:
      "Looking for more information on our peptides or additional supplies? You can find the answer to all these and more on our FAQ page.",
    ...(process.env.ENVIRONMENT === "production" && {
      alternates: {
        canonical: `/faq/`,
      },
    }),
  };
}

export default async function Faq() {
  const jsonLd: WithContext<any> = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://smartpeptides.com//#organization",
        name: "Smart Peptides",
        url: "https://smartpeptides.com/",
        logo: "https://smartpeptides.com//images/logo.svg",
        description:
          "Leading provider of high-quality research peptides and peptide blends for scientific research and development.",
        address: { "@type": "PostalAddress", addressCountry: "US" },
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer service",
          url: "https://smartpeptides.com//contact",
        },
        sameAs: [
          "https://www.facebook.com/profile.php?id=61577011570165",
          "https://www.instagram.com/peptide.city/",
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://smartpeptides.com//#website",
        url: "https://smartpeptides.com/",
        name: "SMART PEPTIDES",
        publisher: { "@id": "https://smartpeptides.com//#organization" },
        inLanguage: "en-US",
      },
      {
        "@type": "ImageObject",
        "@id": "/images/faqimage.png",
        url: "/images/faqimage.png",
        width: "200",
        height: "200",
        inLanguage: "en-US",
      },
      {
        "@type": "WebPage",
        "@id": "https://smartpeptides.com//faq/#webpage",
        url: "https://smartpeptides.com//faq",
        name: "FAQ's - SMART PEPTIDES",
        description:
          "Looking for more information on our peptides or additional supplies? You can find the answer to all these and more on our FAQ page.",
        datePublished: "2023-07-25T11:41:52-05:00",
        dateModified: "2024-01-08T07:35:43-06:00",
        about: { "@id": "https://smartpeptides.com//#organization" },
        isPartOf: { "@id": "https://smartpeptides.com//#website" },
        primaryImageOfPage: {
          "@id": "/images/faqimage.png",
        },
        inLanguage: "en-US",
      },
      {
        "@type": "FAQPage",
        "@id": "https://smartpeptides.com//faq/#faqpage",
        name: "FAQ's - SMART PEPTIDES",
        description:
          "Frequently asked questions about our research peptides, storage, usage, and purity.",
        mainEntity: FAQS_DATA.map((faq) => ({
          "@type": "Question",
          name: faq.title,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.description
              .replace(/<br\s*\/?>/gi, " ")
              .replace(/<[^>]*>/g, "")
              .replace(/&nbsp;/g, " ")
              .trim(),
          },
        })),
        isPartOf: {
          "@id": "https://smartpeptides.com//faq/#webpage",
        },
        inLanguage: "en-US",
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://smartpeptides.com//faq/#breadcrumb",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://smartpeptides.com//",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "FAQ's",
            item: "https://smartpeptides.com//faq",
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

      <FaqPage />
    </>
  );
}
