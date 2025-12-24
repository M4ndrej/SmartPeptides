export type Blog = {
  author: number;
  categories: number[];
  comment_status: string;
  content: {
    rendered: string;
    protected: boolean;
  };
  date: string;
  date_gmt: string;
  excerpt: { rendered: string; protected: boolean };
  featured_media: number;
  format: string;
  guid: { rendered: string };
  id: number;
  jetpack_featured_media_url: string;
  link: string;
  meta: { footnotes: string };
  modified: string;
  modified_gmt: string;
  ping_status: string;
  slug: string;
  status: string;
  sticky: boolean;
  tags: number[];
  template: string;
  title: { rendered: string };
  type: string;
  _links: any;
};

export type BlogCategoryShort = {
  cat_ID: number;
  name: string;
  slug: string;
};

export type BlogResponse = {
  id: number;
  slug: string;
  jetpack_featured_media_url: string;
  content: string;
  description: string;
  author: string;
  title: { rendered: string };
  date: string;
  categories: BlogCategoryShort[];
  private?: boolean;
};

export type BlogResponseList = BlogResponse[];
