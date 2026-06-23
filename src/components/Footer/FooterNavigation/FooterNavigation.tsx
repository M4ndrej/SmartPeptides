import Link from "next/link";

const FooterNavigation = () => {
  return (
    <>
      <div className="font-18px-ALL pb-[16px] font-bold sm:pb-[16px]">
        Navigation
      </div>
      <div className="flex flex-col gap-y-[8px] sm:gap-y-[10px] sm:pb-0 md:pb-0">
        <Link
          className="font-D16px-M13px cursor-pointer transition duration-300 hover:text-[#333333] sm:leading-[16px]"
          href="/"
        >
          Home
        </Link>
        <Link
          className="font-D16px-M13px cursor-pointer transition duration-300 hover:text-[#333333] sm:leading-[16px]"
          href="/shop"
        >
          Buy Peptides
        </Link>
        <Link
          className="font-D16px-M13px cursor-pointer transition duration-300 hover:text-[#333333] sm:leading-[16px]"
          href="/contact"
        >
          Contact Us
        </Link>
        {/* <Link
          className="font-D16px-M13px cursor-pointer transition duration-300 hover:text-[#333333] sm:leading-[16px]"
          href="/blog"
        >
          Blog
        </Link> */}
        <Link
          className="font-D16px-M13px cursor-pointer transition duration-300 hover:text-[#333333] sm:leading-[16px]"
          href="/faq"
        >
          FAQ
        </Link>
        {/*  <Link
          className="font-D16px-M13px cursor-pointer transition duration-300 hover:text-[#333333] sm:leading-[16px]"
          href="/affiliate"
        >
          Affiliate
        </Link> */}
        {/* <Link
          className="font-D16px-M13px cursor-pointer transition duration-300 hover:text-[#333333] sm:leading-[16px]"
          href="/calculator"
        >
          Calculator
        </Link> */}
      </div>
    </>
  );
};
export default FooterNavigation;
