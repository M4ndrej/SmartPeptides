import classNames from "classnames";
import { FC, SVGProps } from "react";

interface CheckboxIconProps extends SVGProps<SVGSVGElement> {
  rounded?: boolean;
}

const CheckboxIcon: FC<CheckboxIconProps> = ({
  width,
  height,
  className,
  rounded = false,
  ...props
}) => {
  if (rounded) {
    return (
      <svg
        width={width || 15}
        height={height || 16}
        viewBox="0 0 15 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={classNames("select-none", className)}
        {...props}
      >
        <circle cx="7.5" cy="7.99707" r="7.5" fill="#E6E6E6" />
        <path
          d="M4 7.74707L6.5 10.2471L11 5.74707"
          stroke="#9A9A9F"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg
      width={width || 16}
      height={height || 16}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={classNames("select-none", className)}
      {...props}
    >
      <g clipPath="url(#clip0_checkbox)">
        <rect
          x="0.5"
          y="0.5"
          width="15"
          height="15"
          rx="1.5"
          stroke="#9A9A9F"
        />
        <path
          d="M4 8.14118L6.9321 11L12 5"
          stroke="#9A9A9F"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_checkbox">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default CheckboxIcon;
