import classNames from "classnames";
import { FC, SVGProps } from "react";

interface IconProps extends SVGProps<SVGSVGElement> {
  withCircle?: boolean;
  strokeWidth?: number;
  viewBox?: string;
}

const ArrowRight: FC<IconProps> = ({
  width = 40,
  height = 40,
  strokeWidth = 1.5,
  withCircle = false,
  className,
  viewBox = "0 0 40 40",
  ...props
}) => {
  return (
    <svg
      width={width}
      height={height}
      strokeWidth={strokeWidth}
      viewBox={viewBox}
      xmlns="http://www.w3.org/2000/svg"
      className={classNames("fill-none", className)}
      {...props}
    >
      {withCircle && (
        <circle cx="20" cy="20" r="19" strokeWidth={0.8 * strokeWidth} />
      )}
      <path
        d="M17 13L24 20L17 27"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ArrowRight;
