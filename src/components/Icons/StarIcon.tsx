import classNames from "classnames";
import { FC, SVGProps } from "react";

interface IconProps extends SVGProps<SVGSVGElement> {}

const StarIcon: FC<IconProps> = ({
  width = 44,
  height = 42,
  strokeWidth = 2.5,
  className,
  ...props
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 44 42"
      className={classNames("fill-none stroke-dark-blue", className)}
      xmlns="http://www.w3.org/2000/svg"
      strokeWidth={strokeWidth}
      {...props}
    >
      <path d="M21.3013 2.22742C21.5497 1.59106 22.4502 1.59105 22.6987 2.22743L26.9711 13.1726C27.433 14.356 28.5421 15.1617 29.8102 15.2354L41.54 15.9165C42.222 15.9561 42.5003 16.8125 41.9718 17.2454L32.8825 24.691C31.8998 25.496 31.4762 26.7997 31.7981 28.0286L34.775 39.3947C34.9481 40.0555 34.2196 40.5849 33.6446 40.216L23.7547 33.8724C22.6854 33.1866 21.3146 33.1866 20.2453 33.8724L10.3554 40.216C9.7804 40.5849 9.05187 40.0556 9.22496 39.3947L12.2019 28.0286C12.5238 26.7997 12.1002 25.496 11.1175 24.691L2.02821 17.2454C1.49975 16.8125 1.77801 15.9561 2.46001 15.9165L14.1898 15.2354C15.458 15.1617 16.567 14.356 17.0289 13.1726L21.3013 2.22742Z" />
    </svg>
  );
};

export default StarIcon;
