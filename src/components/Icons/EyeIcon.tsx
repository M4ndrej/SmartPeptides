import classNames from "classnames";
import { FC, SVGProps } from "react";

interface IconProps extends SVGProps<SVGSVGElement> {
  withSlash?: boolean;
}

const EyeIcon: FC<IconProps> = ({
  width = 32,
  height = 32,
  strokeWidth = 1.5,
  withSlash,
  className,
  ...props
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      className={classNames("fill-none stroke-gray2", className)}
      strokeWidth={strokeWidth}
      {...props}
    >
      <path d="M27.8305 15.7404L27.6286 15.4309C21.8544 6.58405 8.78585 6.80693 3.15861 15.748C3.06225 15.9011 3.0613 16.0974 3.15765 16.2505C8.81932 25.2463 22.0193 25.1632 27.8288 16.2623C27.9318 16.1045 27.9335 15.8981 27.8305 15.7404Z" />
      <circle cx="15.5" cy="16" r="3.75" />
      {withSlash && <path d="M5 5L26 26" stroke-linecap="round" />}
    </svg>
  );
};

export default EyeIcon;
