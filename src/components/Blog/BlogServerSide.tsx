import { getBlogsList } from "@/lib/blogs";
import BlogsList from "./BlogsList/BlogsList";
import BlogStructure from "./BlogStructure/BlogStructure";

const BlogServerSide = async () => {
  const blogs = await getBlogsList();

  return (
    <BlogStructure>
      <>
        <div className="absolute left-[50%] flex translate-x-[-50%] flex-col items-center">
          <div className="mb-[16px] text-center text-[32px] font-bold">
            <h1 className="font-D32px-T24px-M24px inline">Blog</h1>
            <span className="font-D32px-T24px-M24px">{` (${blogs.length})`}</span>
          </div>
          <div className="h-[2px] w-[48px] rounded-[2px] bg-[#9A9A9F]"></div>
        </div>
        <BlogsList blogs={blogs} />
      </>
    </BlogStructure>
  );
};

export default BlogServerSide;
