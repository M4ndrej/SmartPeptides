import { FC, ReactElement } from "react";
import BlogSidebar from "../BlogSidebar/BlogSidebar";
import BlogsMobile from "../BlogsMobile/BlogsMobile";
import { fetchStaticParams } from "@/server/staticService";

type BlogContentProps = {
  children: ReactElement;
  categorySlug?: string;
};

const BlogStructure: FC<BlogContentProps> = async ({
  children,
  categorySlug,
}) => {
  const staticData = await fetchStaticParams();
  const blogCatNames = staticData.blogCategories.map((b) => b.name);
  const blogCatSlugs = staticData.blogCategories.map((b) => b.slug);

  const blogNames = staticData.blogs.map((b) => b.name);
  const blogSlugs = staticData.blogs.map((b) => b.slug);
  const latestBlugNames = blogNames.slice(0, 5);
  const latestBlogSlugs = blogSlugs.slice(0, 5);

  const renderBlogSidebar = () => (
    <BlogSidebar
      categorySlug={categorySlug}
      categories={blogCatNames}
      slugs={blogCatSlugs}
      latestCats={latestBlugNames}
      latestBlogsSlugs={latestBlogSlugs}
    />
  );

  return (
    <div className="container-margin-bottom-D96px-M64px mt-[48px] w-[100%]">
      <div className="container-padding-inline m-[auto] w-[100%] max-w-[1264px] xl:flex xl:justify-between">
        <div className="hidden xl:block">{renderBlogSidebar()}</div>
        <div className="flex flex-col md:w-[100%] xl:w-[896px]">{children}</div>
      </div>
      <BlogsMobile>{renderBlogSidebar()}</BlogsMobile>
    </div>
  );
};

export default BlogStructure;
