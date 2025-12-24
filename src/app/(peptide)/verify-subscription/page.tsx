import { redirect } from "next/navigation";
import SubscribeVerifying from "@/components/Subscribe/SubscribeVerifying";
import verifySubscriber from "@/app/actions/subscriber/verify/actions";

export const metadata = {
  title: "Thank you for verifying",
  description: "Thank you for verifying",
  ...(process.env.ENVIRONMENT === "production" && {
    alternates: {
      canonical: `/verify-subscription/`,
    },
  }),
  robots: {
    index: false,
    follow: false,
  },
};

export default async function VerifySubscription({
  searchParams,
}: {
  searchParams?: {
    [key: string]: string | string[] | undefined;
  };
}) {
  if (
    !searchParams?.email ||
    !searchParams?.code ||
    typeof searchParams?.email !== "string" ||
    typeof searchParams?.code !== "string"
  ) {
    redirect("/404");
  }

  const redirectSlug =
    typeof searchParams.redirect == "string"
      ? searchParams.redirect
      : undefined;

  const formData = new FormData();
  formData.append("email", searchParams.email);
  formData.append("code", searchParams.code);
  const verify = await verifySubscriber(formData);
  if (!verify?.success) {
    const location = redirectSlug ? `/${redirectSlug}` : "/404";
    redirect(location);
  }

  return (
    <>
      <SubscribeVerifying redirectTo={redirectSlug} />
    </>
  );
}
