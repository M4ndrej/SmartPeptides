import LoginPage from "@/components/Login/LoginPage";
import { getRegisteredUserFromCookie } from "@/helpers/get_registered_user_from_cookie";
import { cookies } from "next/headers";
import { WithContext } from "schema-dts";

export const metadata = {
  title: "Sign In",
  description: "Sign In",
  ...(process.env.ENVIRONMENT === "production" && {
    alternates: {
      canonical: `/sign-in/`,
    },
  }),
};

export default async function Login() {
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
        "@type": "WebPage",
        "@id": "https://valuepeptide.com//sign-in/#webpage",
        url: "https://valuepeptide.com//sign-in",
        name: "Login - VALUE PEPTIDE",
        datePublished: "2023-07-25T11:41:52-05:00",
        dateModified: "2024-01-08T07:35:43-06:00",
        about: { "@id": "https://valuepeptide.com//#organization" },
        isPartOf: { "@id": "https://valuepeptide.com//#website" },
        inLanguage: "en-US",
      },
    ],
  };

  const registeredCookie = cookies().get("registeredUser")?.value ?? "";
  const registeredUser = getRegisteredUserFromCookie(registeredCookie);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <LoginPage registeredUser={registeredUser} />
    </>
  );
}
