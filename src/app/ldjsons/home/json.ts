import { WithContext } from "schema-dts";

export const HomeLdJson: WithContext<any> = {
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
      name: "Smart Peptides",
      publisher: { "@id": "https://smartpeptides.com//#organization" },
      inLanguage: "en-US",
      potentialAction: {
        "@type": "SearchAction",
        target: "https://smartpeptides.com/?s={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "ImageObject",
      "@id": "https://smartpeptides.com//wp-content/uploads/2023/10/newhero.png",
      url: "https://smartpeptides.com//wp-content/uploads/2023/10/newhero.png",
      width: "200",
      height: "200",
      inLanguage: "en-US",
    },
    {
      "@type": "WebPage",
      "@id": "https://smartpeptides.com//#webpage",
      url: "https://smartpeptides.com//",
      name: "Buy Peptides Online - SMART PEPTIDES",
      datePublished: "2023-07-25T11:41:52-05:00",
      dateModified: "2024-01-08T07:35:43-06:00",
      about: { "@id": "https://smartpeptides.com//#organization" },
      isPartOf: { "@id": "https://smartpeptides.com//#website" },
      primaryImageOfPage: {
        "@id":
          "https://smartpeptides.com//wp-content/uploads/2023/10/newhero.png",
      },
      inLanguage: "en-US",
    },
    {
      "@type": "Person",
      "@id": "https://smartpeptides.com//author/mihailo6/",
      name: "mihailo6",
      url: "https://smartpeptides.com//author/mihailo6/",
      image: {
        "@type": "ImageObject",
        "@id":
          "https://secure.gravatar.com/avatar/153ecfc2cf9dc9b7b39bfa534b61564e?s=96&amp;d=mm&amp;r=g",
        url: "https://secure.gravatar.com/avatar/153ecfc2cf9dc9b7b39bfa534b61564e?s=96&amp;d=mm&amp;r=g",
        caption: "mihailo6",
        inLanguage: "en-US",
      },
      worksFor: { "@id": "https://smartpeptides.com//#organization" },
    },
  ],
};
