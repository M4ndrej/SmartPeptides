import { formatDate } from "@/helpers/date_format";
import { BlogResponse } from "@/types/blog";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import BlogCardShowMode from "./BlogCardShowMode/BlogCardShowMode";

interface BlogCardProps {
  blog: BlogResponse;
  blogViewMode?: string;
}

const BlogCard: FC<BlogCardProps> = ({ blog }) => {
  const blogImage = blog?.jetpack_featured_media_url?.replace(
    `${process.env.NEXT_PUBLIC_APP_MAIN}`,
    `${process.env.NEXT_PUBLIC_CDN_MAIN}`
  );

  return (
    <div className="relative">
      <div
        className={
          "w-[100%] min-w-[100%] max-w-[288px] sm:h-auto sm:max-h-[100%] sm:w-[100%] sm:max-w-[100%] md:w-[auto]"
        }
      >
        <Link href={`/${blog.slug}`}>
          <BlogCardShowMode>
            <>
              {blogImage && (
                <Image
                  src={blogImage}
                  width={288}
                  height={288}
                  alt={blog.title.rendered}
                  className={classNames({
                    "mx-auto h-[288px] w-[288px] select-none object-cover transition duration-200 sm:aspect-square sm:h-full sm:w-[100%] md:aspect-square md:h-auto md:w-[100%]":
                      true,
                  })}
                />
              )}

              <div className="300ms bg-black/[.75] absolute left-0 top-0 flex h-[100%] w-[100%] items-center justify-center opacity-0 transition-[opacity] duration-300 ease-in-out">
                <div className="text-[18px] text-white">&#129066;</div>
              </div>
            </>
          </BlogCardShowMode>
        </Link>
        <div className="mb-[10px] ">
          <div className="flex justify-between">
            <div className="text-[13px] uppercase text-gray2">
              {formatDate(blog.date)}
            </div>
          </div>
        </div>
        <div className="sm:max-h-auto mb-[32px] sm:h-auto">
          <Link href={`/${blog.slug}`}>
            <h2
              className="font-D18px-M16px transtion mb-[8px] line-clamp-1 cursor-pointer font-bold duration-300 hover:text-[#E7461E]"
              dangerouslySetInnerHTML={{
                __html: blog.title.rendered || blog.title,
              }}
            ></h2>
          </Link>
          <div
            className="font-D16px-M14px mb-[48px] line-clamp-6 max-h-[144px] sm:mb-[40px] sm:line-clamp-5"
            dangerouslySetInnerHTML={{
              __html: blog.description || blog.content,
            }}
          ></div>
        </div>
      </div>
      <div>
        <Link
          href={`/${blog.slug}`}
          className="font-D16px-M14px absolute bottom-0 cursor-pointer font-medium text-[#E7461E] transition duration-300 hover:text-[#E7461E] "
        >
          READ MORE +
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
