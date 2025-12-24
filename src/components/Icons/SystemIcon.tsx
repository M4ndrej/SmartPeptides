import classNames from "classnames";
import { FC } from "react";

interface SystemIconProps {
  isActive?: boolean;
  className?: string;
  width?: number;
  height?: number;
}

const SystemIcon: FC<SystemIconProps> = ({
  isActive,
  className,
  width,
  height,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={classNames(
        isActive ? "fill-[#E7461E]" : "fill-gray2",
        className
      )}
    >
      <path d="M20.3396 26H11.6604C11.3024 26 11.0094 25.7188 11.0094 25.375C11.0094 25.0312 11.3024 24.75 11.6604 24.75H15.3491V21.8333H7.32075C5.76934 21.8333 4.5 20.6146 4.5 19.125V8.70833C4.5 7.21875 5.76934 6 7.32075 6H24.6792C26.2307 6 27.5 7.21875 27.5 8.70833V19.125C27.5 20.6146 26.2307 21.8333 24.6792 21.8333H16.6509V24.75H20.3396C20.6976 24.75 20.9906 25.0312 20.9906 25.375C20.9906 25.7188 20.6976 26 20.3396 26ZM7.32075 7.25C6.48538 7.25 5.80189 7.90625 5.80189 8.70833V19.125C5.80189 19.9271 6.48538 20.5833 7.32075 20.5833H24.6792C25.5146 20.5833 26.1981 19.9271 26.1981 19.125V8.70833C26.1981 7.90625 25.5146 7.25 24.6792 7.25H7.32075Z" />
    </svg>
  );
};

export default SystemIcon;
