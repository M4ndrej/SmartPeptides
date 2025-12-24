import Button from "@/components/Button/Button";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "Sorry, the page you're looking for doesn't exist.",
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: undefined,
  },
};

export default function NotFound() {
  return (
    <div className="m-auto mb-[96px] mt-[48px] px-[60px] sm:px-[16px] md:px-[32px]">
      <div className="mb-[48px] flex flex-col items-center justify-center">
        <div className="font-D32px-M24px text-center font-bold">
          Whoops, looks like something went wrong!
        </div>
        <div className="font-D16px-M14px mt-[16px] text-center">
          Please click on the button below to return to Home Page.
          <br /> Enjoy your experience and have a nice day.
        </div>
        <div className="mt-[32px]">
          <Link href="/">
            <Button text="BACK HOME" highlighted customClass="w-[184px]" />
          </Link>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <Image
          src="/images/404.svg"
          width={500}
          height={174}
          alt="404 error"
          className="max-w-full"
        />
      </div>
    </div>
  );
}
