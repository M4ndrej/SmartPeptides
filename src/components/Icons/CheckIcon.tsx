import classNames from "classnames";
import { FC, SVGProps } from "react";
interface IconProps extends SVGProps<SVGSVGElement> {
  withCircle?: boolean;
  strokeWidth?: number;
}

const CheckIcon: FC<IconProps> = ({
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
      <path
        d="M4 7.74707L6.5 10.2471L11 5.74707"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CheckIcon;
