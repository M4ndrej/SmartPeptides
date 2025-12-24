import { FC } from "react";
import AuthorizedImage from "../Image/Image";
import { useRouter } from "next/navigation";

export interface ImageArray {
  alt: string;
  src: string;
}
interface RecentlyViewedProductProps {
  images: ImageArray[];
  name: string;
  price: string;
  slug: string;
  closeSidebar?: () => void;
}

const RecentlyViewedProduct: FC<RecentlyViewedProductProps> = ({
  images,
  name,
  price,
  slug,
  closeSidebar,
}) => {
  const router = useRouter();

  const closeSidebarAndNavigateToProduct = (slug: string) => {
    router.push(`/${slug}`);
    closeSidebar && closeSidebar();
  };

  return (
    <div className="flex gap-[16px] ">
      <div
        className=" h-[120px] w-[100px] overflow-hidden"
        onClick={() => closeSidebarAndNavigateToProduct(slug)}
      >
        <AuthorizedImage
          width={100}
          height={120}
          src={images[0]?.src}
          alt={images[0]?.alt}
          className=" h-full w-full cursor-pointer select-none bg-lightgray object-contain transition duration-300 hover:scale-105"
        />
      </div>
      <div className="font-D16px-M13px mt-[28px] flex flex-col gap-[8px] font-bold">
        <p
          className="cursor-pointer transition duration-300 hover:text-[#E7461E]"
          onClick={() => closeSidebarAndNavigateToProduct(slug)}
        >
          {name}{" "}
        </p>
        <p className="text-[#E7461E]">${price}.00 </p>
      </div>
    </div>
  );
};

export default RecentlyViewedProduct;
