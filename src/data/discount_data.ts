export type DiscountItemType = {
  id: number;
  image: string;
  title: string;
  description: string;
  reommended?: string; // Optional recommended badge image path
};

export type DiscountSectionType = {
  headline: string;
  customClass?: string;
  discounts: DiscountItemType[];
};

export const discount_data: DiscountSectionType[] = [
  // {
  //   headline: "VIC (VERY IMPORTANT CUSTOMER)",
  //   customClass: "bg-yellow",
  //   discounts: [
  //     {
  //       id: 1,
  //       image: "/images/vicDiscount10.svg",
  //       title: "10% VIC DISCOUNT",
  //       description:
  //         "Spend $5,000 USD or more and receive a 10% permanent discount",
  //     },
  //     {
  //       id: 2,
  //       image: "/images/vicDiscount15.svg",
  //       title: "15% VIC DISCOUNT",
  //       description:
  //         "Spend $10,000 USD or more and receive a 15% permanent discount",
  //     },
  //     {
  //       id: 3,
  //       image: "/images/vicDiscount20.svg",
  //       title: "20% VIC DISCOUNT",
  //       description:
  //         "Spend $20,000 USD or more and receive a 20% permanent discount",
  //     },
  //     {
  //       id: 4,
  //       image: "/images/vicDiscount25.svg",
  //       title: "25% VIC DISCOUNT",
  //       description:
  //         "Spend $40,000 USD or more and receive a 25% permanent discount",
  //     },
  //     {
  //       id: 5,
  //       image: "/images/vicDiscount30.svg",
  //       title: "30% VIC DISCOUNT",
  //       description:
  //         "Spend $80,000 USD or more and receive a 30% permanent discount",
  //     },
  //   ],
  // },
  // {
  //   headline: "PAYMENT METHODS",
  //   // customClass: "bg-green2",
  //   discounts: [
  //     {
  //       id: 1,
  //       image: "/images/paymentDiscount3.svg",
  //       title: "3% CASH APP DISCOUNT",
  //       description: "Just select CashApp as payment option at checkout",
  //     },
  //     // {
  //     //   id: 2,
  //     //   image: "/images/paymentDiscount3.svg",
  //     //   title: "3% VENMO DISCOUNT",
  //     //   description: "Just select Venmo as payment option at checkout",
  //     // },
  //     {
  //       id: 3,
  //       image: "/images/paymentDiscount5.svg",
  //       title: "5% ZELLE DISCOUNT",
  //       description: "Just select Zelle as payment option at checkout",
  //       reommended: "/images/discountRecomended.png",
  //     },
  //     {
  //       id: 4,
  //       image: "/images/paymentDiscount5.svg",
  //       title: "5% BANK TRANSFER DISCOUNT",
  //       description: "Just select bank transfer as payment option at checkout",
  //       reommended: "/images/discountRecomended.png",
  //     },
  //     {
  //       id: 5,
  //       image: "/images/paymentDiscount5.svg",
  //       title: "5% CRYPTO DISCOUNT",
  //       description:
  //         "Just select cryptocurrency transfer as payment option at checkout",
  //       reommended: "/images/discountRecomended.png",
  //     },
  //   ],
  // },
  // {
  //   headline: "QUANTITY",
  //   customClass: "bg-[#9A9A9F]",
  //   discounts: [
  //     {
  //       id: 1,
  //       image: "/images/discount5.svg",
  //       title: "5% QUANTITY DISCOUNT 5+",
  //       description:
  //         "Purchase 5 or more of the same item to receive a 5% discount",
  //     },
  //     {
  //       id: 2,
  //       image: "/images/discount8.svg",
  //       title: "8% QUANTITY DISCOUNT 10+",
  //       description:
  //         "Purchase 10 or more of the same item to receive a 8% discount",
  //     },
  //   ],
  // },
  // {
  //   headline: "FIRST ORDER",
  //   customClass: "bg-[#9A9A9F]",
  //   discounts: [
  //     {
  //       id: 1,
  //       image: "/images/discountFirstOrder.svg",
  //       title: "15% FIRST ORDER DISCOUNT",
  //       description:
  //         "For registered customers, that never purchased from us before",
  //     },
  //   ],
  // },
  {
    headline: "HOLIDAYS",
    customClass: "bg-[#9A9A9F]",
    discounts: [
      {
        id: 1,
        image: "/images/discountHoliday20.svg",
        title: "US FEDERAL HOLIDAY",
        description:
          "For registered customers, that never purchased from us before",
      },
      {
        id: 2,
        image: "/images/discountHoliday15.svg",
        title: "HOLIDAY",
        description:
          "For registered customers, that never purchased from us before",
      },
    ],
  },
];
