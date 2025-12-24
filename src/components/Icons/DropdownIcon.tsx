import classNames from "classnames";
import { FC, SVGProps } from "react";

interface IconProps extends SVGProps<SVGSVGElement> {}

const DropdownIcon: FC<IconProps> = ({
  width = 13,
  height = 7,
  className,
  ...props
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 13 7"
      xmlns="http://www.w3.org/2000/svg"
      className={classNames("fill-none stroke-black", className)}
      {...props}
    >
      <path
        d="M12 6L6.5 0.999999L1 6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default DropdownIcon;
