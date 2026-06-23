import classNames from "classnames";
import { FC } from "react";

interface BigSaleBannerVectorProps {
  className?: string;
}

export const BigSaleBannerVector: FC<BigSaleBannerVectorProps> = ({
  className,
}) => {
  return (
    <svg
      width="59"
      height="139"
      viewBox="0 0 59 139"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={classNames("", className)}
    >
      <path d="M17 139L59 0H42L0 139H17Z" fill="#333333" />
    </svg>
  );
};
