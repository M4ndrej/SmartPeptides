import classNames from "classnames";
import { FC, SVGProps } from "react";

interface IconProps extends SVGProps<SVGSVGElement> {}

const MinusIcon: FC<IconProps> = ({
  width = 13,
  height = 2,
  className,
  ...props
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 13 2"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={classNames(className)}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.25 0.998901C0.25 0.584688 0.585786 0.248901 1 0.248901H12C12.4142 0.248901 12.75 0.584688 12.75 0.998901C12.75 1.41311 12.4142 1.7489 12 1.7489H1C0.585786 1.7489 0.25 1.41311 0.25 0.998901Z"
        fill="#E7461E"
        className={className}
      />
    </svg>
  );
};

export default MinusIcon;
