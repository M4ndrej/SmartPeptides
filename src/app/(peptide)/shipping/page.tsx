import { WithContext } from "schema-dts";

export const metadata = {
  title: "Shipping",
  description: "Shipping",
  ...(process.env.ENVIRONMENT === "production" && {
    alternates: {
      canonical: `/shipping/`,
    },
  }),
};

export default async function ShippingPage() {
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
        publisher: {
          "@id": "https://valuepeptide.com//#organization",
        },
        inLanguage: "en-US",
      },
      {
        "@type": "WebPage",
        "@id": "https://valuepeptide.com//shipping/#webpage",
        url: "https://valuepeptide.com//shipping/",
        name: "Shipping - VALUE PEPTIDE",
        datePublished: "2023-07-26T07:50:27-05:00",
        dateModified: "2023-12-12T10:44:10-06:00",
        isPartOf: {
          "@id": "https://valuepeptide.com//#website",
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

      <div className="container-margin-bottom-D96px-M64px container-padding-inline mx-auto flex max-w-[1264px] flex-col gap-[16px] pt-[48px]">
        <div className="flex flex-col items-center gap-[24px] text-center">
          <h1 className="font-D32px-M24px flex flex-col items-center justify-center gap-[16px]  font-bold">
            Shipping <div className="h-[2px] w-[48px] bg-[#E7461E]"></div>
          </h1>
        </div>
        <div className="container-padding-inline m-[auto] w-[100%] max-w-[1264px] sm:max-w-[100vw] md:max-w-[100vw]">
          <div className="font-16px-ALL container-margin-bottom-D96px-M64px">
            <div className="font-D24px-M18px mb-[20px] text-[#E7461E]">
              When will my order be shipped?
            </div>

            <div className="mb-[20px]">
              Once your payment is confirmed in our system, your order enters
              the shipping queue. Most deliveries arrive within 2 to 5 business
              days.
            </div>

            <div className="mb-[20px]">
              Orders placed before 3 PM are shipped the same day. Orders
              submitted after 3 PM are shipped on the next business day. We ship
              Monday through Friday.
            </div>

            <div className="font-D24px-M18px mb-[20px] text-[#E7461E]">
              How much does shipping cost?
            </div>

            <div className="mb-[20px]">
              Domestic US customers receive free shipping on orders over 150
              dollars. International customers qualify for free shipping once
              their order exceeds 500 dollars.
            </div>

            <div className="mb-[20px]">
              Shipping costs are shown clearly during checkout so there are no
              surprises or hidden fees.
            </div>

            <div className="font-D24px-M18px mb-[20px] text-[#E7461E]">
              Do you offer expedited shipping?
            </div>

            <div className="mb-[20px]">
              Yes. You can select an expedited shipping option during checkout
              if you prefer faster delivery.
            </div>

            <div className="font-D24px-M18px mb-[20px] text-[#E7461E]">
              How are orders shipped?
            </div>

            <div className="mb-[20px]">
              All shipments are handled through UPS. Each package is
              photographed and documented before it leaves our facility to
              protect our customers in case of mishandling by the carrier.
            </div>

            <div className="mb-[20px]">
              If your package is lost or arrives damaged, contact us within 14
              days so we can arrange a replacement or solution.
            </div>

            <div className="font-D24px-M18px mb-[20px] text-[#E7461E]">
              Do you offer international shipping?
            </div>

            <div className="mb-[20px]">
              Yes, international shipping is available for all products. Free
              international shipping applies to orders above 500 dollars.
            </div>

            <div className="mb-[20px]">
              Please note that international customers are expected to be
              qualified researchers.
            </div>

            <div className="font-D24px-M18px mb-[20px] text-[#E7461E]">
              Do you offer free shipping?
            </div>

            <div className="mb-[20px]">
              Yes. Free shipping applies to domestic orders over 150 dollars and
              international orders over 500 dollars.
            </div>

            <div className="font-D24px-M18px mb-[20px] text-[#E7461E]">
              Is a signature required upon delivery?
            </div>

            <div className="mb-[20px]">
              A signature is required for all orders valued above 500 dollars.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
