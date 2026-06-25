import { FC } from "react";

type SpinnerProps = {
  widthHeight?: string;
  reverseColors?: boolean;
  customClass?: string;
};

const Spinner: FC<SpinnerProps> = ({
  widthHeight = "h-5 w-5 ",
  reverseColors,
  customClass,
}) => {
  return (
    <svg
      className={`mr-[-20px] animate-spin duration-200 ${customClass}   ${
        reverseColors ? "revv" : "bg-transparent "
      } ${widthHeight}`}
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke={reverseColors ? "#FFFFFF" : "#9A9A9F"}
        fill="transparent"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill={reverseColors ? "#FFFFFF" : "#9A9A9F"}
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );
};

export default Spinner;
