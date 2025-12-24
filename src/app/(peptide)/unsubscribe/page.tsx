import { redirect } from "next/navigation";
import SubscribeUnsubscribe from "@/components/Subscribe/SubscribeUnsubscribe";
import { globalFetcher } from "@/helpers/server_fetchers";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Confirm you want to unsubscribe",
  description: "Confirm you want to unsubscribe",
  ...(process.env.ENVIRONMENT === "production" && {
    alternates: {
      canonical: `/unsubscribe/`,
    },
  }),
  robots: {
    index: false,
    follow: false,
  },
};

async function getSubscriber(email: string, code: string) {
  const result = await globalFetcher({
    url: `${process.env.API_URL}/mysubscriber/v2/get-subscriber?email=${email}&code=${code}`,
    method: "GET",
    apiType: "global",
  });
  if (!result.ok) {
    return { error: true };
  }
  return await result.json();
}

export default async function Unsubscribe({
  searchParams,
}: {
  searchParams?: {
    [key: string]: string | string[] | undefined;
  };
}) {
  if (
    !searchParams?.email ||
    typeof searchParams?.email !== "string" ||
    !searchParams?.code ||
    typeof searchParams?.code !== "string"
  ) {
    redirect("/404");
  }

  const data = await getSubscriber(searchParams.email, searchParams.code);
  if (data?.error) {
    redirect("/404");
  }

  return (
    <>
      <SubscribeUnsubscribe
        email={searchParams.email}
        code={searchParams.code}
      />
    </>
  );
}
