"use client";

import BlogCard from "@/components/BlogCard/BlogCard";
import classNames from "classnames";
import {
  ChangeEvent,
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Blog } from "@/types/blog";
import Sidebar, {
  defaultMonth,
  archiveMonth,
} from "@/components/Sidebar/Sidebar";
import useSWRInfinite from "swr/infinite";
import { fetcher } from "@/helpers/fetchers";
import useSWR from "swr";
import Spinner from "../SvgComponents/Spinner";
import SidePopover from "../SidePopover/SidePopover";
import Image from "next/image";
import { BlogCategoryList } from "@/types/blog-categories";

interface BlogProps {
  //latestBlogs: Blog[];
  textSearch: string;
  categorySearch: string;
}

interface PageProps {
  index: number;
  search?: string;
  category?: number;
  blogViewMode: string;
  handlePageData: (postCount: number, pageCount: number) => void;
  setIsLoading?: Dispatch<SetStateAction<boolean>>;
}

const Page: FC<PageProps> = ({
  index,
  search,
  category,
  blogViewMode,
  handlePageData,
  setIsLoading,
}) => {
  let url = `/api/blogs?page=${index + 1}&per_page=9`;
  if (search) url += `&search=${search}`;
  if (category) url += `&categories=${category}`;

  const { data, isLoading } = useSWR(url, fetcher);

  const totalPages = parseInt(data?.pagination?.pages);
  const totalBlogs = parseInt(data?.pagination?.count);

  useEffect(() => {
    if (!isNaN(totalBlogs) && !isNaN(totalPages))
      handlePageData(totalBlogs, totalPages);
  }, [handlePageData, totalBlogs, totalPages]);

  useEffect(() => {
    if (setIsLoading) setIsLoading(isLoading);
  }, [setIsLoading, isLoading]);

  if (isLoading)
    return (
      <div className="z-30 my-20 flex w-[100%] justify-center md:absolute md:left-0 md:top-[-50px]">
        <Spinner widthHeight="h-8 w-8" />
      </div>
    );

  const blogsList =
    data && data.blogs.length
      ? []
          .concat(...data.blogs)
          .filter((item: any) => item?.hasOwnProperty("id"))
      : [];

  return blogsList.map((blog: any) => (
    <BlogCard key={blog.id} blog={blog} blogViewMode={blogViewMode} />
  ));
};

const Blogs: FC<BlogProps> = ({
  //latestBlogs,
  textSearch,
  categorySearch,
}) => {
  const [pageIndex, setPageIndex] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [search, setSearch] = useState(textSearch ? textSearch : "");
  const [category, setCategory] = useState(
    categorySearch ? parseInt(categorySearch) : 0
  );

  const [blogViewMode, setBlogViewMode] = useState("image");

  const { data: blogCategories } = useSWR<BlogCategoryList>(
    "/api/blogs/categories",
    fetcher
  );

  const { data } = useSWR<{ blogs: Blog[] }>(
    "/api/blogs?page=1&per_page=5",
    fetcher
  );
  const { blogs: latestBlogs } = data || { blogs: [] };

  const searchedCategory = useMemo(() => {
    return blogCategories?.find((cat) => cat.id == category);
  }, [blogCategories]);

  const [isLoading, setIsLoading] = useState(true);

  const [popoverOpened, handlePopover] = useState(false);
  const [popoverType, handlePopoverType] = useState("");

  const handlePageData = (postCount: number, pageCount: number) => {
    setTotalCount(postCount);
    setTotalPages(pageCount);
  };

  const handleSearch = (search: string) => {
    setPageIndex(0);
    setSearch(search);
  };

  const handleCategory = (categoryId: number) => {
    setPageIndex(0);
    setCategory(categoryId);
  };

  const handleArchive = (month: archiveMonth) => {
    setPageIndex(0);
  };

  const handlePopoverAction = (open: boolean, type: string) => {
    handlePopover(open);
    handlePopoverType(type);
  };

  return (
    <>
      <div className="container-margin-bottom-D96px-M64px mt-[48px] w-[100%] ">
        <div className="container-padding-inline m-[auto] flex w-[100%] max-w-[1264px] justify-between">
          <div className="hidden xl:block">
            <Sidebar
              blogs={latestBlogs}
              blogCategories={blogCategories}
              activeSearch={search}
              activeCat={category}
              handleSearch={handleSearch}
              handleCategory={handleCategory}
              handleArchive={handleArchive}
            />
          </div>
          <div className="flex w-[896px] flex-col md:w-[100%]">
            <div className="flex flex-col items-center">
              <div className="font-D32px-M24px mb-[16px] text-center font-bold">
                <h1 className="inline">
                  {!searchedCategory && `Blogs `}
                  {searchedCategory &&
                    `Category Archives: ${searchedCategory.name} `}
                </h1>
                {!isLoading ? `(${totalCount})` : ""}
              </div>
              <div className="h-[2px] w-[48px] rounded-[2px] bg-[#E7461E]"></div>
            </div>
            <div
              className={classNames({
                "mb-[16px] mt-[39px] flex items-center justify-end pr-[3px] sm:mt-[32px] md:mt-[40px]":
                  true,
                hidden: isLoading,
              })}
            >
              <div
                className={classNames({
                  "cursor-pointer": true,
                  "[&_path]:stroke-[#E7461E]": blogViewMode == "image",
                  "[&_path]:stroke-gray2 [&_path]:hover:stroke-[#E7461E]":
                    blogViewMode == "text",
                })}
                onClick={() => setBlogViewMode("image")}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  className="h-[32px] w-[32px] sm:h-[20px] sm:w-[20px]"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M5.23875 3.33337H14.7626C15.2677 3.33337 15.7522 3.53405 16.1094 3.89127C16.4666 4.24848 16.6673 4.73296 16.6673 5.23814V14.7619C16.6673 15.2671 16.4666 15.7516 16.1094 16.1088C15.7522 16.466 15.2677 16.6667 14.7626 16.6667H5.23875C4.73357 16.6667 4.24909 16.466 3.89188 16.1088C3.53466 15.7516 3.33398 15.2671 3.33398 14.7619V5.23814C3.33398 4.73296 3.53466 4.24848 3.89188 3.89127C4.24909 3.53405 4.73357 3.33337 5.23875 3.33337Z"
                    stroke="#E7461E"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16.6673 12.8572L13.8102 10.0001L10.953 12.843M14.7626 16.6668L6.19113 8.09534L3.33398 10.9525"
                    stroke="#E7461E"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M13.3332 7.61912C13.8592 7.61912 14.2856 7.19272 14.2856 6.66674C14.2856 6.14075 13.8592 5.71436 13.3332 5.71436C12.8073 5.71436 12.3809 6.14075 12.3809 6.66674C12.3809 7.19272 12.8073 7.61912 13.3332 7.61912Z"
                    fill="#E7461E"
                  />
                </svg>
              </div>
              <div
                className={classNames({
                  "font-D24px-M18px ml-[8px] cursor-pointer": true,
                  "text-gray2 hover:text-[#E7461E]": blogViewMode == "image",
                  "text-[#E7461E]": blogViewMode == "text",
                })}
                onClick={() => setBlogViewMode("text")}
              >
                A
              </div>
            </div>
            <div
              className={classNames({
                "flex flex-wrap gap-x-[16px] gap-y-[40px] sm:items-center sm:justify-center md:relative md:grid md:grid-cols-3":
                  true,
              })}
            >
              <Page
                index={pageIndex}
                search={search}
                category={category}
                blogViewMode={blogViewMode}
                handlePageData={handlePageData}
                setIsLoading={setIsLoading}
              />
              <div className="hidden">
                <Page
                  index={pageIndex + 1}
                  search={search}
                  category={category}
                  blogViewMode={blogViewMode}
                  handlePageData={handlePageData}
                />
              </div>
            </div>

            {!isLoading && (
              <div className="m-auto mt-[48px] flex items-center justify-center gap-x-[12px]">
                {[...Array(totalPages)].map((e, i) => (
                  <div key={i}>
                    <div
                      className={classNames({
                        "flex cursor-pointer items-center justify-center rounded-[5px] px-[9px] text-center":
                          true,
                        "bg-[#E7461E] text-white": pageIndex == i,
                        "text-gray2 hover:text-[#E7461E]": pageIndex != i,
                      })}
                      onClick={() => setPageIndex(i)}
                    >
                      {i + 1}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div
          className="fixed left-0 top-[356px] z-[1] hidden items-center justify-center rounded-r-[5px] bg-[#E7461E] opacity-70 sm:flex sm:h-[44px] sm:w-[44px] md:flex md:h-[44px] md:w-[44px]"
          onClick={() => handlePopoverAction(true, "blogsidebar")}
        >
          <Image
            className="hidden select-none sm:block md:block"
            src="/images/filter-icon.svg"
            width={22}
            height={22}
            alt="Filter"
          />
        </div>
        <SidePopover
          popoverOpened={popoverOpened}
          type={popoverType}
          fromTop={false}
          fromLeft={true}
          blogSidebarProps={{
            blogs: latestBlogs,
            blogCategories: blogCategories,
            activeSearch: search,
            activeCat: category,
            handleSearch: handleSearch,
            handleCategory: handleCategory,
            handleArchive: handleArchive,
          }}
          onClose={() => {
            handlePopover(false);
          }}
        />
      </div>
    </>
  );
};

export default Blogs;
