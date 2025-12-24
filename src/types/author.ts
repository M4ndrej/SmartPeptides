export interface Author {
  id: number;
  name: string;
  url: string;
  description: string;
  link: string;
  slug: string;
  avatar_urls: AvatarUrls;
  meta: any[];
  is_super_admin: boolean;
  woocommerce_meta: WoocommerceMeta;
  _links: Links;
}

export interface AvatarUrls {
  "24": string;
  "48": string;
  "96": string;
}

export interface WoocommerceMeta {
  variable_product_tour_shown: string;
  activity_panel_inbox_last_read: string;
  activity_panel_reviews_last_read: string;
  categories_report_columns: string;
  coupons_report_columns: string;
  customers_report_columns: string;
  orders_report_columns: string;
  products_report_columns: string;
  revenue_report_columns: string;
  taxes_report_columns: string;
  variations_report_columns: string;
  dashboard_sections: string;
  dashboard_chart_type: string;
  dashboard_chart_interval: string;
  dashboard_leaderboard_rows: string;
  homepage_layout: string;
  homepage_stats: string;
  task_list_tracked_started_tasks: string;
  help_panel_highlight_shown: string;
  android_app_banner_dismissed: string;
}

export interface Links {
  self: Self[];
  collection: Collection[];
}

export interface Self {
  href: string;
}

export interface Collection {
  href: string;
}
