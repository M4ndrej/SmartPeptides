import classNames from "classnames";
import { FC } from "react";

interface BigSaleBannerVectorProps {
  className?: string;
}
export const BigSaleBannerVector2: FC<BigSaleBannerVectorProps> = ({
  className,
}) => {
  return (
    <svg
      width="78"
      height="198"
      viewBox="0 0 78 198"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={classNames("", className)}
    >
      <path d="M17 198L77.5 0H60.5L0 198H17Z" fill="#22659C" />
    </svg>
  );
};
