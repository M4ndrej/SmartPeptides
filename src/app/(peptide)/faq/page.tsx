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
        "@id": "https://smartpeptides.bio//#organization",
        name: "Smart Peptides",
        url: "https://smartpeptides.bio/",
        logo: "https://smartpeptides.bio//images/logo.svg",
        description:
          "Leading provider of high-quality research peptides and peptide blends for scientific research and development.",
        address: { "@type": "PostalAddress", addressCountry: "US" },
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer service",
          url: "https://smartpeptides.bio//contact",
        },
        sameAs: [
          "https://www.facebook.com/profile.php?id=61577011570165",
          "https://www.instagram.com/peptide.city/",
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://smartpeptides.bio//#website",
        url: "https://smartpeptides.bio/",
        name: "SMART PEPTIDES",
        publisher: { "@id": "https://smartpeptides.bio//#organization" },
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
        "@id": "https://smartpeptides.bio//faq/#webpage",
        url: "https://smartpeptides.bio//faq",
        name: "FAQ's - SMART PEPTIDES",
        description:
          "Looking for more information on our peptides or additional supplies? You can find the answer to all these and more on our FAQ page.",
        datePublished: "2023-07-25T11:41:52-05:00",
        dateModified: "2024-01-08T07:35:43-06:00",
        about: { "@id": "https://smartpeptides.bio//#organization" },
        isPartOf: { "@id": "https://smartpeptides.bio//#website" },
        primaryImageOfPage: {
          "@id": "/images/faqimage.png",
        },
        inLanguage: "en-US",
      },
      {
        "@type": "FAQPage",
        "@id": "https://smartpeptides.bio//faq/#faqpage",
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
          "@id": "https://smartpeptides.bio//faq/#webpage",
        },
        inLanguage: "en-US",
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://smartpeptides.bio//faq/#breadcrumb",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://smartpeptides.bio//",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "FAQ's",
            item: "https://smartpeptides.bio//faq",
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
