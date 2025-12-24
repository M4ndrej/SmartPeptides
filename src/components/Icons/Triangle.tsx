import classNames from "classnames";
import { FC, SVGProps } from "react";

interface IconProps extends SVGProps<SVGSVGElement> {}

const Triangle: FC<IconProps> = ({
  width = 16,
  height = 16,
  className,
  ...props
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      className={classNames("fill-black", className)}
      {...props}
    >
      <path d="M16 0 L0 16 L16 16 Z" />
    </svg>
  );
};

export default Triangle;
