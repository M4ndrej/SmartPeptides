import classNames from "classnames";
import { FC, SVGProps } from "react";

interface IconProps extends SVGProps<SVGSVGElement> {}

const FacebookIcon: FC<IconProps> = ({
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
      className={classNames("fill-black stroke-none", className)}
      {...props}
    >
      <path d="M11.1495 6.54972H8.6162V4.23427C8.73683 3.24565 9.30191 2.73834 10.2543 2.73834H11.3337V1.35947C11.2321 1.34647 11.1432 1.33346 11.0479 1.33346H9.65747C9.03525 1.33346 8.43842 1.50907 7.96858 1.83427C7.45429 2.205 7.09874 2.80338 7.0162 3.42126C6.95271 3.71395 6.92096 4.00012 6.92096 4.26679V6.58224H4.66699V8.18224H6.88921V14.6668H8.71779V8.14972H10.9845L11.1495 6.54972Z" />
    </svg>
  );
};

export default FacebookIcon;
