import { instagramData } from "@/data/instagram_data";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";

const Instagram = () => {
  return (
    <div className="mt-[64px] flex flex-col items-center xl:mt-[96px]">
      <div className="flex w-full flex-col items-center">
        <h2 className="font-D32px-M24px font-bold">Our Instagram</h2>
        <div className="mt-[16px] h-[2px] w-[48px] bg-[#E7461E]"></div>
      </div>
      <div className="mt-[32px] flex w-full flex-col items-center">
        <Link
          href="https://www.instagram.com/peptide.shop/"
          className="font-24px-ALL blue-color-hover font-bold text-[#E7461E]"
          target="_blank"
        >
          @peptide.shop
        </Link>
        <div className="mt-[16px] flex gap-[20px]">
          <div className="flex flex-col items-center">
            <p className="font-16px-ALL font-bold">23</p>
            <p className="font-13px-ALL leading-[15px]">posts</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="font-16px-ALL font-bold">3248</p>
            <p className="font-13px-ALL leading-[15px]">followers</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="font-16px-ALL font-bold">1115</p>
            <p className="font-13px-ALL leading-[15px]">following</p>
          </div>
        </div>
        <div className="mt-[24px] grid w-full gap-[16px] sm:grid-cols-2 sm:gap-[10px] md:grid-cols-2 from834:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
          {instagramData?.map((post, index) => (
            <div
              key={index}
              className={classNames({
                "relative w-full overflow-hidden": true,
                "sm:hidden xl:hidden": post.hideOnMobAndDeskt,
              })}
            >
              <Link
                href={post.link}
                target="_blank"
                className="block w-full [&_img]:hover:scale-[1.08]"
              >
                <Image
                  src={post.imgSrc}
                  width={288}
                  height={297}
                  alt="Instagram post"
                  className="h-full w-full select-none transition duration-200"
                />{" "}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Instagram;
