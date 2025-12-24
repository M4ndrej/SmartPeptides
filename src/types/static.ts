// export type StaticRedirect = {
//   slug: string;
//   redirect_url: string;
// };

// export type StaticRedirectList = StaticRedirect[];

export type StaticProductCategory = {
  id: number;
  name: string;
  slug: string;
};

export type StaticProductCategoryList = StaticProductCategory[];

export type StaticProduct = {
  id: number;
  name: string;
  slug: string;
  meta: {
    title: string;
    description: string;
    image: {
      id: string;
      src: string;
      name: string;
      alt: string;
    };
  };
};

export type StaticProductList = StaticProduct[];

export type StaticBlogCategory = {
  id: number;
  name: string;
  slug: string;
  meta: {
    title: string;
    description: string;
  };
};

export type StaticBlogCategoryList = StaticBlogCategory[];

export type StaticBlog = {
  id: number;
  name: string;
  slug: string;
  meta: {
    title: string;
    description: string;
    image: {
      src: string;
    };
  };
};

export type StaticBlogList = StaticBlog[];

export type StaticData = {
  // redirects: StaticRedirectList;
  productCategories: StaticProductCategoryList;
  products: StaticProductList;
  blogCategories: StaticBlogCategoryList;
  blogs: StaticBlogList;
};

export type StaticSlugs = { slug: string }[];

export type SlugMetaProps = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
