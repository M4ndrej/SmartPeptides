"use client";

import { fetcher } from "@/helpers/fetchers";
import { FC, Suspense } from "react";
import useSWR from "swr";
import SubscribeContent from "../Subscribe/SubscribeContent/SubscribeContent";
import Link from "next/link";
import Image from "next/image";
import Logo from "../Logo/Logo";

const NewFooter: FC = () => {
  const { data: userData } = useSWR("/api/user/", fetcher);
  const { user } = userData || { user: {} };

  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#000000] flex justify-center">
      {" "}
      <div className="grid w-full grid-cols-1 gap-10   py-[60px] text-textWhite max-w-[1264px]  sm:px-[24px] xl:grid-cols-2 xl:grid-rows-2">
        <div className="flex flex-col gap-4">
          <Logo fixedColor />
          <p className=" text-sm leading-relaxed">
            Lorem ipsum dolor sit amet consectetur. Sem nam at quis magnis eget
            est id. Turpis feugiat amet enim morbi at feugiat posuere mattis.
            Sapien neque nullam lacus nec facilisi bibendum amet. Velit urna
            scelerisque enim eu nunc viverra. Lorem ipsum dolor sit amet
            consectetur. Sem nam at quis magnis eget est id. Turpis feugiat amet
            enim morbi at feugiat posuere mattis. Sapien neque nullam lacus nec
            facilisi bibendum amet. Velit urna scelerisque enim eu nunc viverra.
            Lorem ipsum dolor sit amet consectetur. Sem nam at quis magnis eget
            est id. Turpis feugiat amet enim morbi at feugiat posuere mattis.
            Sapien neque nullam lacus nec facilisi bibendum amet. Velit urna
            scelerisque enim eu nunc viverra.
          </p>
        </div>

        <div className="flex items-end gap-[60px]">
          <div className="flex flex-col gap-2">
            <Link href="/" className="transition-colors hover:text-[#9A9A9F]">
              Home
            </Link>
            <Link
              href="/shop"
              className="transition-colors hover:text-[#9A9A9F]"
            >
              Buy Products
            </Link>
            <Link
              href="/faq"
              className="transition-colors hover:text-[#9A9A9F]"
            >
              FAQ
            </Link>
            <Link
              href="/blog"
              className="transition-colors hover:text-[#9A9A9F]"
            >
              Blog
            </Link>
            <Link
              href="/contact"
              className="transition-colors hover:text-[#9A9A9F]"
            >
              Contact Us
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <Link
              href="/sign-in"
              className="transition-colors hover:text-[#9A9A9F]"
            >
              Login
            </Link>
            <Link
              href="/sign-in"
              className="transition-colors hover:text-[#9A9A9F]"
            >
              Register
            </Link>
            <Link
              href="/refunds"
              className="transition-colors hover:text-[#9A9A9F]"
            >
              Refund and Return Policy
            </Link>
            <Link
              href="/privacy"
              className="transition-colors hover:text-[#9A9A9F]"
            >
              Privacy Policy
            </Link>
            <Link
              href="/shipping"
              className="transition-colors hover:text-[#9A9A9F]"
            >
              Shipping Policy
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-[26px] font-bold">Need to get in touch</h3>
          <p className="text-sm leading-relaxed">
            Lorem ipsum dolor sit amet consectetur. Sem nam at quis magnis eget
            est id. Turpis feugiat amet enim @jf morbi at feugiat posuere
            mattis. Sapien neque nullam lacus nec facilisi bibendum amet. Velit
            urna scelerisque enim eu nunc viverra. Lorem ipsum dolor sit amet
            consectetur. Sem nam at quis magnis eget est id. Turpis feugiat amet
            enim morbi at feugiat posuere mattis. Sapien neque nullam lacus nec
            facilisi bibendum amet. Velit urna scelerisque enim eu nunc viverra.
            Lorem ipsum dolor sit amet consectetur. Sem nam at quis magnis eget
            est id. Turpis feugiat amet enim morbi at feugiat posuere mattis.
            Sapien neque nullam lacus nec facilisi bibendum amet. Velit urna
            scelerisque enim eu nunc viverra.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <Suspense fallback={null}>
            <SubscribeContent />
          </Suspense>
          <div className="flex flex-wrap items-center gap-x-[10px] gap-y-[10px]">
            <Image
              src="/images/mastercard.svg"
              width={33}
              height={25}
              alt="Mastercard"
            />
            <Image src="/images/visa.svg" width={53} height={18} alt="Visa" />
            <Image
              src="/images/americanExpress.svg"
              width={73}
              height={15}
              alt="American Express"
            />
            <Image
              src="/images/discoverLogo.svg"
              width={72}
              height={11}
              alt="Discover"
            />
            <Image src="/images/zelle.svg" width={24} height={24} alt="Zelle" />
            <Image
              src="/images/cashapp.svg"
              width={24}
              height={24}
              alt="CashApp"
            />
            <Image
              src="/images/crypto.svg"
              width={24}
              height={24}
              alt="Crypto"
            />
            <Image src="/images/venmo.png" width={24} height={24} alt="Venmo" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default NewFooter;
