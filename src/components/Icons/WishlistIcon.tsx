import { FC } from "react";

interface WishlistIconProps {
  customClass?: string;
  onPress?: () => void;
  inWishlist?: boolean;
  listView?: boolean;
}

const WishlistIcon: FC<WishlistIconProps> = ({
  customClass,
  inWishlist,
  onPress,
  listView,
}) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${customClass} ${listView ? "[&_path]:stroke-gray2 dark:[&_path]:stroke-gray4" : ""}`}
      onClick={onPress}
    >
      <path
        d="M16.6875 3.1875C14.7188 3.1875 13.0069 4.07531 12 5.56313C10.9931 4.07531 9.28125 3.1875 7.3125 3.1875C5.82119 3.18924 4.39146 3.78243 3.33694 4.83694C2.28243 5.89146 1.68924 7.32119 1.6875 8.8125C1.6875 11.55 3.39375 14.3991 6.75937 17.2791C8.30161 18.5932 9.96751 19.7549 11.7338 20.7478C11.8156 20.7918 11.9071 20.8148 12 20.8148C12.0929 20.8148 12.1844 20.7918 12.2662 20.7478C14.0325 19.7549 15.6984 18.5932 17.2406 17.2791C20.6062 14.3991 22.3125 11.55 22.3125 8.8125C22.3108 7.32119 21.7176 5.89146 20.6631 4.83694C19.6085 3.78243 18.1788 3.18924 16.6875 3.1875Z"
        fill={inWishlist ? "#E7461E" : '"none"'}
        className={
          inWishlist
            ? "transition-all duration-200"
            : "transition-all duration-200 dark:stroke-gray4"
        }
        stroke={inWishlist ? "#E7461E" : "#333333"}
      />
    </svg>
  );
};
export default WishlistIcon;
