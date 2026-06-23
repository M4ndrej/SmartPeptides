"use client";

import { ChangeEvent, FC, useEffect, useMemo, useState } from "react";
import { Blog } from "@/types/blog";
import Input from "@/components/Input/Input";
import Link from "next/link";
import classNames from "classnames";
import { BlogCategoryList } from "@/types/blog-categories";

interface SidebarProps {
  blogs: Blog[] | undefined;
  blogCategories: BlogCategoryList | undefined;
  activeSearch?: string;
  activeCat?: number;
  activeArchive?: archiveMonth;
  handleSearch: (search: string) => void;
  handleCategory: (category: number) => void;
  handleArchive: (month: any) => void;
}

export interface archiveMonth {
  text: string;
  firstDay: string;
  lastDay: string;
}

export const defaultMonth = { text: "", firstDay: "", lastDay: "" };

const Sidebar: FC<SidebarProps> = ({
  blogs,
  blogCategories,
  activeSearch,
  activeCat,
  activeArchive,
  handleSearch,
  handleCategory,
  handleArchive,
}) => {
  const [search, setSearch] = useState(activeSearch ? activeSearch : "");
  const [searchChanged, setSearchChanged] = useState(false);
  const [activeCategory, setActiveCategory] = useState(
    activeCat ? activeCat : 0
  );

  const [activeMonth, setActiveMonth] = useState<archiveMonth>(
    activeArchive ? activeArchive : defaultMonth
  );

  const categories = useMemo(() => {
    return blogCategories?.filter((cat) => cat.count > 0);
  }, [blogCategories]);

  const handleInput = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    setSearch(() => fieldValue);
    setSearchChanged(true);
  };

  const changeCategory = (categoryId: number) => {
    let catId = categoryId;
    if (categoryId == activeCategory) catId = 0;

    setActiveCategory(catId);
    handleCategory(catId);

    if (activeMonth.text) {
      setActiveMonth(defaultMonth);
      handleArchive(defaultMonth);
    }
  };

  useEffect(() => {
    if (searchChanged) {
      const delayDebounceFn = setTimeout(() => {
        handleSearch(search);
        setSearchChanged(false);
      }, 2000);

      return () => clearTimeout(delayDebounceFn);
    }
  }, [handleSearch, search, searchChanged]);

  return (
    <div className="flex w-[288px] flex-col gap-y-[40px] pr-[16px] sm:h-full sm:w-full sm:overflow-auto sm:pb-[24px] md:h-full md:w-full md:overflow-auto">
      <div>
        <div className="font-D18px-M16px mb-[16px] font-bold">Search</div>
        <Input
          label="Start typing ..."
          value={search}
          required={false}
          customClass="!w-[278px] !h-[44px] !px-[16px] !py-[12px]"
          onChange={handleInput}
        />
      </div>
      <div>
        <div className="font-D18px-M16px mb-[16px] font-bold">
          Recent ({blogs?.length})
        </div>
        <div className="flex flex-col gap-y-[16px]">
          {blogs?.map((blog, i) => (
            <Link key={i} href={`/${blog.slug}`} className="group">
              <div className="flex cursor-pointer gap-x-[8px]">
                <div className="mt-[8px] h-[8px] w-[8px] min-w-[8px] rounded-full bg-gray "></div>
                <div
                  className="font-16px-ALL !text-gray2 transition duration-300 group-hover:!text-[#333333]"
                  dangerouslySetInnerHTML={{
                    __html: blog.title.rendered,
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
          <div onClick={() => changeCategory(0)}>
            <div className="flex cursor-pointer items-center gap-x-[8px] [&_div]:hover:text-[#333333]">
              <div
                className={classNames({
                  " h-[8px] w-[8px] min-w-[8px] rounded-full": true,
                  "bg-gray": activeCategory != 0,
                  "bg-[#333333]": activeCategory == 0,
                })}
              ></div>
              <div
                className={classNames({
                  "font-16px-ALL transition-[color] ease-in-out": true,
                  "text-gray2": activeCategory != 0,
                  "font-bold text-[#333333]": activeCategory == 0,
                })}
              >
                All categories
              </div>
            </div>
          </div>
          {categories?.map((category, i) => (
            <div
              key={i}
              className={classNames({ hidden: !category.count })}
              onClick={() => changeCategory(category.id)}
            >
              <div className="flex cursor-pointer items-center gap-x-[8px] [&_div]:hover:text-[#333333]">
                <div
                  className={classNames({
                    "h-[8px] w-[8px] min-w-[8px] rounded-full": true,
                    "bg-gray": activeCategory != category.id,
                    "bg-[#333333]": activeCategory == category.id,
                  })}
                ></div>
                <div
                  className={classNames({
                    "font-16px-ALL transition-[color] ease-in-out": true,
                    "text-gray2": activeCategory != category.id,
                    "font-bold text-[#333333]": activeCategory == category.id,
                  })}
                >
                  {category.name}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
