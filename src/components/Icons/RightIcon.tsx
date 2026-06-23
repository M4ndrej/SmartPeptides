import classNames from "classnames";
import { FC, SVGProps } from "react";

interface IconProps extends SVGProps<SVGSVGElement> {
  strokeWidth?: number;
}

const RightIcon: FC<IconProps> = ({
  width = 12,
  height = 12,
  strokeWidth = 1.5,
  className,
  ...props
}) => {
  return (
    <svg
      width={width}
      height={height}
      strokeWidth={strokeWidth}
      viewBox="0 0 10 20"
      xmlns="http://www.w3.org/2000/svg"
      className={classNames("fill-none stroke-[#333333]", className)}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M2 2L9 10L2 18" />
    </svg>
  );
};

export default RightIcon;
