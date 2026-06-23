import { FC } from "react";
import BlogStructure from "../BlogStructure/BlogStructure";
import BlogsList from "../BlogsList/BlogsList";
import { getBlogsList } from "@/lib/blogs";

type BlogCategoryProps = {
  categoryName: string;
  categorySlug: string;
};

const BlogCategory: FC<BlogCategoryProps> = async ({
  categoryName,
  categorySlug,
}) => {
  const blogs = await getBlogsList(categorySlug);
  return (
    <BlogStructure categorySlug={categorySlug}>
      <>
        <div className="flex flex-col items-center">
          <div className="mb-[16px] text-center text-[32px] font-bold text-darkgray">
            <h1 className="inline">{`Category Archives: ${categoryName} `}</h1>
            {` (${blogs.length})`}
          </div>
          <div className="h-[2px] w-[48px] rounded-[2px] bg-[#333333]"></div>
        </div>
        <BlogsList blogs={blogs} />
      </>
    </BlogStructure>
  );
};

export default BlogCategory;
