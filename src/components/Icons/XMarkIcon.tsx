import classNames from "classnames";
import { FC, SVGProps } from "react";

interface IconProps extends SVGProps<SVGSVGElement> {
  withCircle?: boolean;
  strokeWidth?: number;
}

const XMarkIcon: FC<IconProps> = ({
  width = 16,
  height = 16,
  className,
  withCircle = false,
  strokeWidth = 1,
  ...props
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      className={classNames("fill-none stroke-textWhite", className)}
      strokeWidth={strokeWidth}
      {...props}
    >
      {withCircle && (
        <circle cx="8" cy="8" r="7.5" strokeWidth={0.8 * strokeWidth} />
      )}
      <path d="M4.3 4.3L11.7 11.7" strokeLinecap="round" />
      <path d="M4.3 11.7L11.7 4.3" strokeLinecap="round" />
    </svg>
  );
};

export default XMarkIcon;
