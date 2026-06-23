import BlogCard from "@/components/BlogCard/BlogCard";
import { BlogResponseList } from "@/types/blog";
import { FC } from "react";
import BlogListStructure from "./BlogListStructure/BlogListStructure";
type BlogsListProps = {
  blogs: BlogResponseList;
};

const BlogsList: FC<BlogsListProps> = ({ blogs }) => {
  return (
    <>
      <BlogListStructure />
      <div
        className={
          "grid w-full gap-x-[16px] gap-y-[40px] sm:grid-cols-1 md:grid-cols-2 from834:grid-cols-3"
        }
      >
        {blogs.map((blog, index) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
      {/* 
          {!isLoading && (
            <div className="m-auto mt-[48px] flex items-center justify-center gap-x-[12px]">
              {[...Array(totalPages)].map((e, i) => (
                <div key={i}>
                  <div
                    className={classNames({
                      "flex cursor-pointer items-center justify-center rounded-[5px] px-[9px] text-center":
                        true,
                      "bg-[#333333] text-white": pageIndex == i,
                      "text-gray2 hover:text-[#333333]": pageIndex != i,
                    })}
                    onClick={() => setPageIndex(i)}
                  >
                    {i + 1}
                  </div>
                </div>
              ))}
            </div>
          )} */}
    </>
  );
};

export default BlogsList;
