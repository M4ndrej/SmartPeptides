"use client";

import { FC, useMemo, useState } from "react";
import { productFilter } from "@/data/product_data";
import classNames from "classnames";
import Image from "next/image";
import SidePopover from "../SidePopover/SidePopover";
import { ProductList, ProductNew } from "@/types/product";
import useSWR from "swr";
import { Category } from "@/types/category";
import { fetcher } from "@/helpers/fetchers";
import PeptidesCategoriesAccoridon from "../PeptidesCategories/PeptidesCategoriesAccordion";

interface OurProductsProps {
  products: ProductList;
}

const OurProducts: FC<OurProductsProps> = ({ products }) => {
  const { data: categoryList } = useSWR<Category[]>(
    "/api/products/categories",
    fetcher
  );

  const categories = useMemo(() => {
    return categoryList?.filter(
      (category) => !category.parent && category.slug !== "peptides"
    );
  }, [categoryList]);

  const [currentFilter, handleFilter] = useState("ALL");
  const [filteredProducts, handleProducts] = useState(products);
  const [popoverOpened, handlePopover] = useState(false);
  const [popoverType, handlePopoverType] = useState("");
  const [emptyStateMessage, setEmptyStateMessage] = useState("");

  const handlePopoverAction = (open: boolean, type: string) => {
    handlePopover(open);
    handlePopoverType(type);
  };

  const getNewArrivals = (productList: any) => {
    const today = new Date();
    const sixtyDaysAgo = new Date();
    sixtyDaysAgo.setDate(today.getDate() - 60);

    const newArrivalsList = productList.filter((product: ProductNew) => {
      const productDate = new Date(product.date_created);
      return productDate >= sixtyDaysAgo && productDate <= today;
    });

    if (newArrivalsList.length > 0) {
      return newArrivalsList;
    } else {
      setEmptyStateMessage("No New Arrivals");
    }
  };

  const getFeaturedOrOnSale = (productList: any, type: string) => {
    const featuredOrOnSaleProducts = productList.filter(
      (product: ProductNew) => {
        return (
          (type == "FEATURED" && product.featured) ||
          (type == "ON SALE" && product.on_sale)
        );
      }
    );

    if (featuredOrOnSaleProducts.length > 0) {
      return featuredOrOnSaleProducts;
    } else {
      setEmptyStateMessage(
        featuredOrOnSaleProducts.length === 0 && type === "FEATURED"
          ? "No featured products"
          : "No products on sale"
      );
    }
  };

  const sortBestseller = (productList: any) => {
    const bestsellers = productList
      .slice()
      .filter((product: ProductNew) => {
        return product.total_sales > 500;
      })
      .sort(
        (a: { total_sales: number }, b: { total_sales: number }) =>
          b.total_sales - a.total_sales
      );

    if (bestsellers.length > 0) {
      return bestsellers;
    } else {
      setEmptyStateMessage("No bestsellers currently");
    }
  };

  const peptidesOnly = products;

  const changeFilter = (filterName: string) => {
    handleFilter(filterName);

    switch (filterName) {
      case "NEW ARRIVALS":
        let newArrivals = getNewArrivals(peptidesOnly);
        handleProducts(newArrivals);
        break;
      // case "FEATURED":
      //   let featured = getFeaturedOrOnSale(peptidesOnly, filterName);
      //   handleProducts(featured);
      //   break;
      case "ON SALE":
        let onSale = getFeaturedOrOnSale(peptidesOnly, filterName);
        handleProducts(onSale);
        break;
      case "BEST SELLER":
        let bestseller = sortBestseller(peptidesOnly);
        handleProducts(bestseller);
        break;
      default:
        handleProducts(peptidesOnly);
        break;
    }
  };

  return (
    <>
      <div className="flex w-full flex-col items-center">
        <h2 className="font-D32px-M24px font-bold">Our Products</h2>
        <div className="mt-[16px] h-[2px] w-[48px] bg-[#9A9A9F]"></div>
      </div>
      <div className="our-product-filters-alignment mb-[44px] mt-[40px] flex h-fit gap-[32px] sm:mb-[24px] sm:mt-[8px] sm:overflow-auto xl:mb-[40px]">
        {productFilter.map((item: any, index: number) => (
          <div
            key={index}
            className={classNames({
              "product-filter-btn font-D16px-M14px animate-font-weight underlineNew relative cursor-pointer transition-[color] ease-in-out  hover:text-gray sm:mt-[32px] sm:flex sm:flex-row-reverse sm:items-center [&_div]:hover:w-[100%]":
                true,
              "text-darkgray": currentFilter !== item.name,
              "!font-bold !text-darkgray after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-[#9A9A9F] after:content-['']":
                currentFilter === item.name,
            })}
            onClick={() => {
              changeFilter(item.name);
            }}
          >
            <div className="sm:whitespace-nowrap">{item.name}</div>
            {/* <div
              className={classNames({
                "h-[2px] w-0 rounded bg-[#9A9A9F] transition-[width] ease-in-out sm:mr-[16px] sm:w-[24px]":
                  true,
                "w-[100%]": currentFilter == item.name,
                "sm:hidden": currentFilter != item.name,
              })}
            ></div> */}
          </div>
        ))}
      </div>
      <div className="relative flex gap-[32px]">
        <div className="purchase-peptides-sidebar-list hidden w-[198px] flex-col gap-[40px] xl:flex">
          {/* <PeptidesOnlyList /> */}
          {categories?.map((category: Category, index: number) => (
            <div key={`category-${index}`}>
              <PeptidesCategoriesAccoridon
                textElipsis
                category={category}
                title={category.name}
                homePage
              />
            </div>
          ))}
        </div>
        <div
          className="absolute left-0 top-[72px] z-[1] hidden items-center justify-center rounded-r-[5px] bg-[#9A9A9F] opacity-70 sm:flex sm:h-[44px] sm:w-[44px] md:flex md:h-[44px] md:w-[44px] lg:flex lg:h-[44px] lg:w-[44px] xl:hidden"
          onClick={() => handlePopoverAction(true, "productslist")}
        >
          <Image
            className="hidden select-none sm:block sm:h-[32px] sm:w-[32px] md:block md:h-[32px] md:w-[32px] lg:block lg:h-[32px] lg:w-[32px] xl:hidden"
            src="/images/products_tags_opener.svg"
            width={40}
            height={40}
            alt="Tags"
          />
        </div>
        {/* <OurProductsList products={productsData} /> */}
      </div>
      <SidePopover
        popoverOpened={popoverOpened}
        type={popoverType}
        fromTop={false}
        fromLeft={true}
        showClosingArrow={true}
        customClass="!px-[16px] !py-[24px]"
        onClose={() => {
          handlePopover(false);
        }}
      />
    </>
  );
};

export default OurProducts;
