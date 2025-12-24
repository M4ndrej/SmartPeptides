// import React, { FC } from "react";
// import Carousel, { ResponsiveType } from "react-multi-carousel";
// import CarouselCustomArrows from "../CarouselCustomArrows/CarouselCustomArrows";
// import CarouselCustomDots from "../CarouselCustomDots/CarouselCustomDots";
// import SingleProductImage from "./SingleProductImage";
// import { Image as ImageType } from "@/types/product";

// interface SingleProductCarouselProps {
//   isMerch?: boolean;
//   isMobile: boolean;
//   responsive: ResponsiveType;
//   productImages: ImageType[];
//   hasPartedImage?: boolean;
//   handlePopoverAction: (open: boolean, type: string) => void;
//   setIsModalOpen: (isOpen: boolean) => void;
//   onImageClick?: (index: number) => void;
// }

// const SingleProductCarousel: FC<SingleProductCarouselProps> = ({
//   isMerch,
//   isMobile,
//   responsive,
//   productImages,
//   hasPartedImage,
//   handlePopoverAction,
//   setIsModalOpen,
//   onImageClick,
// }) => {
//   return (
//     <Carousel
//       showDots
//       renderDotsOutside
//       swipeable={isMobile}
//       draggable={isMobile}
//       responsive={responsive}
//       customTransition="transform 300ms ease-in-out"
//       transitionDuration={500}
//       containerClass="w-[491px] h-[633px] mb-[16px] sm:mb-[10px] carousel-container !static sm:w-full md:w-full sm:h-[380px] md:h-[636px] from834:h-[411px] lg:h-[482px] lg:w-full xl:h-[633px]"
//       dotListClass="w-full !relative  snap-x overflow-auto flex-nowrap !justify-start scrollbar !pb-[6px]"
//       itemClass="carousel-item-padding-40-px [&_img]:first:object-cover sm:[&_img]:first:object-contain [&_img]:first:scale-[.90] sm:[&_img]:first:scale-[1]"
//       customLeftArrow={
//         <CarouselCustomArrows
//           side="left"
//           onClick={() => {}}
//           productItemArrows={true}
//         />
//       }
//       customRightArrow={
//         <CarouselCustomArrows
//           side="right"
//           onClick={() => {}}
//           productItemArrows={true}
//         />
//       }
//       customDot={
//         <CarouselCustomDots
//           index={0}
//           active
//           images={productImages!}
//           onClick={() => {}}
//           hasPartedImage={hasPartedImage}
//         />
//       }
//     >
//       {productImages
//         ?.filter((image, i) => !hasPartedImage || ![0, 1].includes(i))
//         ?.map((image, i: number) => (
//           <SingleProductImage
//             key={i}
//             index={i}
//             image={image}
//             contain={isMerch}
//             firstImage={productImages[1]}
//             hasPartedImage={hasPartedImage}
//             handlePopoverAction={handlePopoverAction}
//             setIsModalOpen={setIsModalOpen}
//             onImageClick={onImageClick}
//           />
//         ))}
//     </Carousel>
//   );
// };

// export default SingleProductCarousel;
