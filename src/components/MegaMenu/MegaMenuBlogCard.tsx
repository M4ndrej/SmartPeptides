import Image from "next/image";
import { BlogResponse } from "@/types/blog";
import { FC } from "react";
import Link from "next/link";
interface MegaMenuBlogCardProps {
  blog: BlogResponse;
}

const MegaMenuBlogCard: FC<MegaMenuBlogCardProps> = ({ blog }) => {
  return (
    <div className="flex gap-[16px]">
      <Link
        href={`/${blog.slug}`}
        className="h-[162px] min-w-[162px] overflow-hidden border-[1px] border-gray4 sm:h-[140px] sm:min-w-[140px]"
      >
        <Image
          width={162}
          height={162}
          src={blog.jetpack_featured_media_url}
          alt={blog.title.rendered}
          className="h-full w-full cursor-pointer select-none transition duration-200 hover:scale-[1.05]"
        />
      </Link>
      <div className="flex flex-col justify-between">
        <div>
          <Link
            href={`/${blog.slug}`}
            className="font-18px-ALL mb-[8px] line-clamp-1 cursor-pointer font-bold transition duration-200 hover:text-[#333333]"
            dangerouslySetInnerHTML={{
              __html: blog.title.rendered || blog.title,
            }}
          ></Link>
          <div
            className="font-16px-ALL line-clamp-3"
            style={{ fontFamily: "inherit" }}
            dangerouslySetInnerHTML={{
              __html: blog.content || blog.description,
            }}
          ></div>
        </div>
        <Link
          href={`/${blog.slug}`}
          className="font-16px-ALL group flex items-center gap-[8px] font-medium text-[#333333] transition duration-200 hover:text-[#333333]"
        >
          READ MORE
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M6.5 1C6.5 0.585786 6.16421 0.25 5.75 0.25C5.33579 0.25 5 0.585786 5 1V5.25H0.75C0.335786 5.25 0 5.58579 0 6C0 6.41421 0.335786 6.75 0.75 6.75H5V11C5 11.4142 5.33579 11.75 5.75 11.75C6.16421 11.75 6.5 11.4142 6.5 11V6.75H10.75C11.1642 6.75 11.5 6.41421 11.5 6C11.5 5.58579 11.1642 5.25 10.75 5.25H6.5V1Z"
              fill="#333333"
              className="transition duration-200 group-hover:fill-dark-blue"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default MegaMenuBlogCard;
