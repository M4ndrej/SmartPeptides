// import classNames from "classnames";
// import { FC } from "react";

// interface ArrowLeftIconProps {
//   type?: string;
// }

// const ArrowLeftIcon: FC<ArrowLeftIconProps> = ({ type }) => {
//   return (
//     <div
//       className={classNames(
//         "w-10 h-10 flex items-center justify-center",
//         {
//           "border border-white rounded-[5px] bg-transparent": type === "prod-gallery",
//         }
//       )}
//     >
//       <svg
//         width="32"
//         height="32"
//         viewBox="0 0 24 24"
//         fill="none"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         <path
//           d="M15 18L9 12L15 6"
//           stroke={type === "prod-gallery" ? "#FFFFFF" : "#E3E3E3"}
//           strokeWidth="1"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         />
//       </svg>
//     </div>
//   );
// };

// export default ArrowLeftIcon;
import classNames from "classnames";
import { FC } from "react";

interface ArrowLeftIconProps {
  type?: string;
}

const ArrowLeftIcon: FC<ArrowLeftIconProps> = ({ type }) => {
  const isGallery = type === "prod-gallery";

  return (
    <div
      className={classNames(
        "group flex h-10 w-10 items-center justify-center rounded-[5px] transition-colors duration-200",
        {
          "xl:border xl:border-[#C8C8C8] xl:bg-transparent": isGallery,
          "bg-sliderArrowBg xl:bg-transparent": isGallery,
          "hover:bg-[#242424] xl:hover:bg-transparent": isGallery,
          "xl:hover:bg-white": isGallery,
        }
      )}
    >
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15 18L9 12L15 6"
          stroke="#C8C8C8"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={classNames("transition-colors duration-200", {
            "xl:group-hover:stroke-#C8C8C8": isGallery,
          })}
        />
      </svg>
    </div>
  );
};

export default ArrowLeftIcon;
