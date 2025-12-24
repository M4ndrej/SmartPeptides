import DosageCalculator from "@/components/PeptideDosageCalculator/DosageCalculator";
import { WithContext } from "schema-dts";
export const metadata = {
  title: "Peptide Dosage Calculator - Reconstitute Your Peptides The Right Way",
  description:
    "Value Peptide`s peptide calculator will help you figure out the exact amount of solvent you need to add to your peptide powder and reconstitute it properly.",
  ...(process.env.ENVIRONMENT === "production" && {
    alternates: {
      canonical: `/calculator/`,
    },
  }),
};
export default async function Calculator() {
  const jsonLd: WithContext<any> = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://valuepeptide.com//#organization",
        name: "VALUE PEPTIDE",
      },
      {
        "@type": "WebSite",
        "@id": "https://valuepeptide.com//#website",
        url: "https://valuepeptide.com/",
        name: "VALUE PEPTIDE",
        publisher: { "@id": "https://valuepeptide.com//#organization" },
        inLanguage: "en-US",
      },
      {
        "@type": "ImageObject",
        "@id":
          "https://api.valuepeptide.com//wp-content/uploads/2023/10/newhero.png",
        url: "https://api.valuepeptide.com//wp-content/uploads/2023/10/newhero.png",
        width: "200",
        height: "200",
        inLanguage: "en-US",
      },
      {
        "@type": "WebPage",
        "@id": "https://valuepeptide.com//#webpage",
        url: "https://valuepeptide.com//calculator",
        name: "Buy Peptides Online - VALUE PEPTIDE",
        datePublished: "2023-07-25T11:41:52-05:00",
        dateModified: "2024-01-08T07:35:43-06:00",
        about: { "@id": "https://valuepeptide.com//#organization" },
        isPartOf: { "@id": "https://valuepeptide.com//#website" },
        primaryImageOfPage: {
          "@id":
            "https://api.valuepeptide.com//wp-content/uploads/2023/10/newhero.png",
        },
        inLanguage: "en-US",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <DosageCalculator />
    </>
  );
}
