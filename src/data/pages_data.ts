export interface IPagesProps {
  link: string;
  title: string;
  headerTitle: string;
  showInNav: boolean;
  hasDropdown?: boolean;
  showMegaMenu?: boolean;
  stayActive?: boolean;
  subRoute?: {
    name: string;
    link?: string;
    links?: string[];
  };
}

export const pages: IPagesProps[] = [
  {
    link: "/",
    title: "HOME",
    headerTitle: "Home",
    showInNav: true,
  },
  {
    link: "/shop",
    title: "PEPTIDES FOR SALE",
    headerTitle: "Shop",
    showInNav: true,
    showMegaMenu: true,
    hasDropdown: true,
    subRoute: {
      name: "Test",
      links: [
        "/shop",
        "/peptides",
        "/blends",
        "/cosmetic",
        "/supplies",
      ],
    },
  },
  // {
  //   link: "/merch",
  //   title: "Merch",
  //   headerTitle: "Merch",
  //   showInNav: true,
  //   showMegaMenu: true,
  //   stayActive: true,
  // },
  {
    link: "/peptides",
    title: "Peptides",
    headerTitle: "Peptides",
    showInNav: false,
  },
  {
    link: "/blends",
    title: "Peptide Blends",
    headerTitle: "Peptide Blends",
    showInNav: false,
  },
  {
    link: "/cosmetic-peptides",
    title: "Cosmetic Peptides",
    headerTitle: "Cosmetic Peptides",
    showInNav: false,
  },
  {
    link: "/peptide-supplies",
    title: "Peptide Supplies",
    headerTitle: "Peptide Supplies",
    showInNav: false,
  },
  {
    link: "/about",
    title: "ABOUT US",
    headerTitle: "About Us",
    showInNav: true,
  },
  {
    link: "/contact",
    title: "CONTACT",
    headerTitle: "Contact Us",
    showInNav: true,
  },
  // {
  //   link: "/blog",
  //   title: "Blog",
  //   headerTitle: "Blogs",
  //   showInNav: true,
  // },
  { link: "/faq", title: "FAQ", headerTitle: "FAQ", showInNav: false },
  {
    link: "/affiliate",
    title: "Affiliate",
    headerTitle: "Affiliate",
    showInNav: false,
  },
  {
    link: "/profile",
    title: "Profile",
    headerTitle: "My Dashboard",
    showInNav: false,
    subRoute: { name: "Dashboard", link: "/profile?tabId=1" },
  },
  {
    link: "/profile/orders",
    title: "Orders",
    headerTitle: "My Orders",
    showInNav: false,
  },
  {
    link: "/profile/address",
    title: "My Address",
    headerTitle: "My Address",
    showInNav: false,
  },
  {
    link: "/profile/store-credits",
    title: "Store Credits",
    headerTitle: "Store Credits",
    showInNav: false,
  },
  {
    link: "/profile/details",
    title: "Profile Details",
    headerTitle: "Profile Details",
    showInNav: false,
  },
  {
    link: "/profile/affiliate",
    title: "My Affiliate",
    headerTitle: "My Affiliate",
    showInNav: false,
  },
  {
    link: "/profile/affiliate/sales",
    title: "My Affiliate Sales",
    headerTitle: "My Affiliate Sales",
    showInNav: false,
  },
  {
    link: "/profile/affiliate/customers",
    title: "My Affiliate Customers",
    headerTitle: "My Affiliate Customers",
    showInNav: false,
  },
  {
    link: "/profile/affiliate/payouts",
    title: "My Affiliate Payouts",
    headerTitle: "My Affiliate Payouts",
    showInNav: false,
  },
  {
    link: "/profile/affiliate/creatives",
    title: "My Affiliate Creatives",
    headerTitle: "My Affiliate Creatives",
    showInNav: false,
  },
  {
    link: "/profile/affiliate/edit",
    title: "Edit Affiliate Profile",
    headerTitle: "Edit Affiliate Profile",
    showInNav: false,
  },
  {
    link: "/cart",
    title: "Cart",
    headerTitle: "My Cart",
    showInNav: false,
  },
  /*   {
    link: "/calculator",
    title: "Calculator",
    headerTitle: "Calculator",
    showInNav: false,
  }, */
  {
    link: "/terms",
    title: "Terms of Service",
    headerTitle: "Terms of Service",
    showInNav: false,
  },
  {
    link: "/privacy",
    title: "Privacy policy",
    headerTitle: "Privacy policy",
    showInNav: false,
  },
  /*   {
    link: "/calculator",
    title: "Calculator",
    headerTitle: "Calculator",
    showInNav: true,
    hasDropdown: false,
  }, */
  // {
  //   link: "/affiliate",
  //   title: "Affiliate",
  //   headerTitle: "Affiliate",
  //   showInNav: true,
  // },
  // {
  //   link: "/affiliate-home",
  //   title: "Store Affiliates",
  //   headerTitle: "Store Affiliates",
  //   showInNav: false,
  // },
  // {
  //   link: "/affiliate-register",
  //   title: "Affiliate Register",
  //   headerTitle: "Affiliate Register",
  //   showInNav: false,
  // },
  // {
  //   link: "/affiliate-login",
  //   title: "Affiliate Login",
  //   headerTitle: "Affiliate Login",
  //   showInNav: false,
  // },
  {
    link: "/refunds",
    title: "Refunds and Returns",
    headerTitle: "Refunds and Returns",
    showInNav: false,
  },
  {
    link: "/tracking",
    title: "Order Tracking",
    headerTitle: "Order Tracking",
    showInNav: false,
  },
  {
    link: "/shipment-tracking",
    title: "Shipment Tracking",
    headerTitle: "Shipment Tracking",
    showInNav: false,
  },
  // {
  //   link: "/store-affiliates-overview",
  //   title: "Store Affiliates Overview",
  //   headerTitle: "Store Affiliates Overview",
  //   showInNav: false,
  // },
  // {
  //   link: "/store-affiliates-sales",
  //   title: "Store Affiliates Sales",
  //   headerTitle: "Store Affiliates Sales",
  //   showInNav: false,
  // },
  // {
  //   link: "/store-affiliates-payment-history",
  //   title: "Store Afiliates Payment History",
  //   headerTitle: "Store Affiliates Payment History",
  //   showInNav: false,
  // },
  // {
  //   link: "/store-affiliates-creatives",
  //   title: "Store Afiliates Creatives",
  //   headerTitle: "Store Affiliates Creatives",
  //   showInNav: false,
  // },
  // {
  //   link: "/store-affiliates-edit-profile",
  //   title: "Store Afiliates Edit Profile",
  //   headerTitle: "Store Affiliates Edit Profile",
  //   showInNav: false,
  // },
  {
    link: "/order-preview",
    title: "Order Preview",
    headerTitle: "Order Preview",
    showInNav: false,
  },
  {
    link: "/discount",
    title: "Discounts",
    headerTitle: "Discounts",
    showInNav: false,
  },
  {
    link: "/sign-in",
    title: "Sign In",
    headerTitle: "Sign In",
    showInNav: false,
  },
  {
    link: "/verify-subscription",
    title: "Thank you for verifying",
    headerTitle: "Thank you for verifying",
    showInNav: false,
  },
  {
    link: "/manage-subscription",
    title: "Manage your subscription",
    headerTitle: "Manage your subscription",
    showInNav: false,
  },
  {
    link: "/unsubscribe",
    title: "Confirm you want to unsubscribe",
    headerTitle: "Confirm you want to unsubscribe",
    showInNav: false,
  },
  {
    link: "/shipping",
    title: "Shipping",
    headerTitle: "Shipping",
    showInNav: false,
  },
];
