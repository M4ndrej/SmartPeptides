import classNames from "classnames";
import { FC, SVGProps } from "react";

interface IconProps extends SVGProps<SVGSVGElement> {}

const SearchIcon: FC<IconProps> = ({
  width = 32,
  height = 32,
  className,
  ...props
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      className={classNames("fill-black", className)}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.07043 21.49C5.64043 18.06 5.64043 12.5 9.07043 9.06997C12.5004 5.63997 18.0604 5.63997 21.4904 9.06997C24.9204 12.5 24.9204 18.06 21.4904 21.49C18.0604 24.92 12.5004 24.92 9.07043 21.49ZM8.01043 8.00997C4.00043 12.03 4.00043 18.54 8.01043 22.55C11.8304 26.37 17.9004 26.56 21.9404 23.11C21.9704 23.16 22.0104 23.21 22.0604 23.26L26.3004 27.5C26.5904 27.79 27.0704 27.79 27.3604 27.5C27.6504 27.21 27.6504 26.73 27.3604 26.44L23.1204 22.2C23.1204 22.2 23.0304 22.12 22.9804 22.09C26.5604 18.05 26.4204 11.87 22.5504 7.99997C18.5404 3.99997 12.0304 3.99997 8.01043 8.00997Z"
      />
    </svg>
  );
};

export default SearchIcon;
