import { getBlogBySlug } from "@/lib/blogs";
import BlogStructure from "../BlogStructure/BlogStructure";
import Blog from "./Blog";
import { BlogResponse } from "@/types/blog";
import { FC } from "react";
import "./Blog.css";

type BlogContentProps = {
  slug: string;
};

const BlogContent: FC<BlogContentProps> = async ({ slug }) => {
  const blog: BlogResponse = await getBlogBySlug(slug);

  return (
    <BlogStructure>
      <>
        <div className="blog-class">
          <Blog blog={blog} />
        </div>
      </>
    </BlogStructure>
  );
};

export default BlogContent;
