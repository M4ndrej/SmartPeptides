import { redirect } from "next/navigation";
import SubscribeManage from "@/components/Subscribe/SubscribeManage";
import { globalFetcher } from "@/helpers/server_fetchers";

export const metadata = {
  title: "Manage your subscription",
  description: "Manage your subscription",
  ...(process.env.ENVIRONMENT === "production" && {
    alternates: {
      canonical: `/manage-subscription/`,
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

export default async function ManageSubscription({
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
  const subscriber = {
    email: searchParams.email,
    first_name: data?.first_name ?? "",
    last_name: data?.last_name ?? "",
    code: searchParams.code,
  };

  return (
    <>
      <SubscribeManage subscriber={subscriber} />
    </>
  );
}
