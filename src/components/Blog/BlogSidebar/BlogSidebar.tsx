"use client";
import SearchIcon from "@/components/Icons/SearchIcon";
import MyInput from "@/components/Input/MyInput";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";

type BlogSidebarProps = {
  categories: string[];
  slugs: string[];
  latestCats: string[];
  latestBlogsSlugs: string[];
  categorySlug?: string;
};

const BlogSidebar: FC<BlogSidebarProps> = ({
  categories,
  latestCats,
  slugs,
  latestBlogsSlugs,
  categorySlug,
}) => {
  const pathname = usePathname();

  return (
    <div
      className={classNames({
        "flex w-full flex-col gap-y-[40px] px-[16px] py-[32px] sm:h-full sm:w-full sm:overflow-auto sm:px-[10px] sm:py-[16px] sm:pb-[24px] sm:pt-[28px] md:h-full md:w-full md:overflow-auto xl:w-[288px] xl:px-0 xl:py-0":
          true,
        "xl:mt-[107px]": pathname === "/blog/",
      })}
    >
      <div>
        <div className="font-D18px-M16px mb-[16px] font-bold">Search</div>
        <MyInput
          label="Start typing ..."
          value={""}
          required={false}
          containerClassName="xl:!w-[278px] !w-full"
          onChange={() => {}}
          icon={
            <SearchIcon className="h-[20px] w-[20px] !fill-gray2 text-gray2" />
          }
        />
      </div>
      <div>
        <div className="font-D18px-M16px mb-[16px] font-bold">
          Recent ({latestCats?.length})
        </div>
        <div className="flex flex-col gap-y-[16px]">
          {latestCats?.map((blog, i) => (
            <Link key={i} href={`/${latestBlogsSlugs[i]}`} className="group">
              <div className="flex cursor-pointer gap-x-[8px]">
                <div className="mt-[8px] h-[8px] w-[8px] min-w-[8px] rounded-full bg-gray"></div>
                <div
                  className="font-D16px-M13px !text-gray2 transition duration-300 group-hover:!text-[#333333]"
                  dangerouslySetInnerHTML={{
                    __html: blog,
                  }}
                  style={{ fontFamily: "inherit" }}
                ></div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div>
        <div className="font-D18px-M16px mb-[16px] font-bold">
          Categories ({categories?.length})
        </div>
        <div className="flex flex-col gap-y-[16px]">
          <Link href={`/blog/`}>
            <div className="flex cursor-pointer items-center gap-x-[8px] [&_div]:hover:text-[#333333]">
              <div
                className={classNames({
                  " h-[8px] w-[8px] min-w-[8px] rounded-full": true,
                  "bg-gray": categorySlug,
                  "bg-[#333333]": !categorySlug,
                })}
              ></div>
              <div
                className={classNames({
                  "font-D16px-M13px transition-[color] ease-in-out": true,
                  "text-gray2": categorySlug,
                  "font-bold text-[#333333]": !categorySlug,
                })}
              >
                All categories
              </div>
            </div>
          </Link>
          {categories?.map((category, i) => (
            <Link
              href={`/${slugs[i]}`}
              key={i}
              //   className={classNames({ hidden: !category.count })}
              //   onClick={() => changeCategory(category.id)}
            >
              <div className="flex cursor-pointer items-center gap-x-[8px] [&_div]:hover:text-[#333333]">
                <div
                  className={classNames({
                    "h-[8px] w-[8px] min-w-[8px] rounded-full": true,
                    "bg-gray": slugs[i] !== categorySlug,
                    "bg-[#333333]": slugs[i] === categorySlug,
                  })}
                ></div>

                <div
                  className={classNames({
                    "font-D16px-M13px transition-[color] ease-in-out": true,
                    "text-gray2": slugs[i] !== categorySlug,
                    "font-bold text-[#333333]": slugs[i] === categorySlug,
                  })}
                >
                  {category}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogSidebar;
