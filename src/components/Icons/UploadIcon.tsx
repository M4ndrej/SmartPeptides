import classNames from "classnames";
import { FC, SVGProps } from "react";

interface IconProps extends SVGProps<SVGSVGElement> {}

const UploadIcon: FC<IconProps> = ({
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
      className={classNames("fill-gray2", className)}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M7.5 11.577V2.927L5.17 5.257L4.462 4.538L8 1L11.538 4.538L10.831 5.258L8.5 2.927V11.577H7.5ZM2.615 15C2.155 15 1.771 14.846 1.463 14.538C1.15433 14.2293 1 13.845 1 13.385V10.962H2V13.385C2 13.5383 2.064 13.6793 2.192 13.808C2.32067 13.936 2.46167 14 2.615 14H13.385C13.5383 14 13.6793 13.936 13.808 13.808C13.936 13.6793 14 13.5383 14 13.385V10.962H15V13.385C15 13.845 14.846 14.229 14.538 14.537C14.2293 14.8457 13.845 15 13.385 15H2.615Z" />
    </svg>
  );
};

export default UploadIcon;
