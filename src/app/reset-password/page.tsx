import { redirect } from "next/navigation";
import ResetPassword from "@/components/ResetPassword/ResetPassword";
import { cookies } from "next/headers";
import Logo from "@/components/Logo/Logo";

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
  const cookieData = cookies();
  const loggedUser = cookieData.get("loggedUser");

  if (
    !searchParams?.email ||
    !searchParams?.code ||
    typeof searchParams?.email !== "string" ||
    typeof searchParams?.code !== "string"
  ) {
    redirect("/404");
  }

  return (
    <div className="w-full">
      <div className="container-padding-inline m-auto mt-[48px] flex flex-col lg:max-w-[1264px]">
        <div className="flex items-center justify-start">
          {/* Logo */}
          <Logo customClass="headerLogo" />
        </div>

        <ResetPassword
          email={searchParams.email}
          code={searchParams.code}
          isUserLogged={!!loggedUser}
        />
      </div>
    </div>
  );
}
