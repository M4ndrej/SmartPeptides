import { FC } from "react";

interface QuickviewIconProps {
  customClass?: string;
  onPress?: () => void;
}

const QuickviewIcon: FC<QuickviewIconProps> = ({ customClass, onPress }) => {
  return (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${customClass}`}
      onClick={onPress}
    >
      <g clipPath="url(#clip0_7985_129021)">
        <path
          d="M23.3471 11.7694L23.1668 11.4957C18.0661 3.75367 6.61273 3.95064 1.64122 11.7762C1.55497 11.9119 1.5541 12.0867 1.64035 12.2225C6.64284 20.0968 18.1021 20.1918 23.2345 12.4015L23.3471 12.2306C23.4393 12.0907 23.4393 11.9093 23.3471 11.7694Z"
          className="stroke-darkgray transition duration-200 dark:stroke-gray4"
        />
        <circle
          cx="12.501"
          cy="12"
          r="3.5"
          stroke="#9A9A9F"
          className="stroke-darkgray transition duration-200 dark:stroke-gray4"
        />
      </g>
      <defs>
        <clipPath id="clip0_7985_129021">
          <rect
            width="24"
            height="24"
            fill="white"
            transform="translate(0.5)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};
export default QuickviewIcon;
