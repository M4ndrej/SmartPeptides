import classNames from "classnames";
import { FC, SVGProps } from "react";

interface IconProps extends SVGProps<SVGSVGElement> {}

const HamburgerIcon: FC<IconProps> = ({
  width = 32,
  height = 32,
  strokeWidth = 1.5,
  strokeLinecap = "round",
  className,
  ...props
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 32 32"
      strokeWidth={strokeWidth}
      strokeLinecap={strokeLinecap}
      xmlns="http://www.w3.org/2000/svg"
      className={classNames("fill-none stroke-black", className)}
      {...props}
    >
      <line x1="5.75" y1="8.25" x2="26.25" y2="8.25" className="stroke-black" />
      <line
        x1="5.75"
        y1="16.25"
        x2="26.25"
        y2="16.25"
        className="stroke-black"
      />
      <line
        x1="5.75"
        y1="24.25"
        x2="26.25"
        y2="24.25"
        className="stroke-black"
      />
    </svg>
  );
};

export default HamburgerIcon;
