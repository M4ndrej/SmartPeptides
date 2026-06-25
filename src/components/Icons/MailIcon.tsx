import classNames from "classnames";
import { FC, SVGProps } from "react";

interface IconProps extends SVGProps<SVGSVGElement> {}

const MailIcon: FC<IconProps> = ({
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
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={classNames(className)}
      {...props}
    >
      <rect
        x="2"
        y="7"
        width="28"
        height="19"
        rx="2"
        stroke="#9A9A9F"
        strokeWidth="2"
      />
      <path
        d="M3 8L14.2924 15.8178C15.3197 16.529 16.6803 16.529 17.7076 15.8178L29 8"
        stroke="#9A9A9F"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default MailIcon;
