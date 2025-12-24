import classNames from "classnames";
import { FC } from "react";

interface TirzNameProps {
  fontWeight?: "bold" | "normal";
  fontSize?: number;
  className?: string;
  hasHover?: boolean;
  fillOpacity?: number;
}

const TirzName: FC<TirzNameProps> = ({
  fontWeight = "normal",
  fontSize = 16,
  className,
  hasHover = true,
  fillOpacity = 1,
}) => {
  const height = fontSize * 1.25;
  return (
    <div
      className={classNames(
        "fill- flex gap-0 transition-all duration-200",
        hasHover && "hover:fill-dark-blue",
        className
      )}
    >
      {fontWeight === "bold" ? (
        <>
          {/* Tirz */}
          <svg
            height={height}
            viewBox="0 0 60.4 39"
            xmlns="http://www.w3.org/2000/svg"
            fillOpacity={fillOpacity}
          >
            <path d="M7.3,31V12.8H0.1V8.6h19.5v4.2h-7.2V31H7.3z M24.2,11.4c-1.9,0-3.1-1.2-3.1-2.8s1.2-2.8,3.1-2.8c1.9,0,3.1,1.2,3.1,2.7 C27.3,10.2,26.1,11.4,24.2,11.4z M21.7,31V13.8h5V31H21.7z M36.1,16.1c1.2-1.7,3.3-2.5,5.9-2.5v4.6c-0.4,0-0.7-0.1-1.1-0.1 c-2.8,0-4.6,1.5-4.6,4.8V31h-5V13.8h4.8V16.1z M50.2,27.2h9.1V31H43.9v-3l8.8-10.4h-8.5v-3.8H59v3L50.2,27.2z" />
          </svg>
        </>
      ) : (
        <>
          {/* Tirz */}
          <svg
            height={height}
            viewBox="0 0 55.9 39"
            xmlns="http://www.w3.org/2000/svg"
            fillOpacity={fillOpacity}
            className="sm:w-[22px]"
          >
            <path d="M8,31V10.6H0.1v-2h18.1v2h-7.9V31H8z M22.3,10.5c-0.9,0-1.7-0.7-1.7-1.6c0-0.9,0.7-1.6,1.7-1.6s1.7,0.7,1.7,1.6 C23.9,9.8,23.2,10.5,22.3,10.5z M21.1,31V14.2h2.3V31H21.1z M31.9,17.5c1.1-2.2,3.2-3.4,6.3-3.4v2.2c-0.2,0-0.4,0-0.5,0 c-3.5,0-5.7,2.2-5.7,6.2V31h-2.3V14.2h2.2V17.5z M43.6,29.1h10.8V31H40.7v-1.5l10.6-13.4H40.9v-1.9h13.3v1.5L43.6,29.1z" />{" "}
          </svg>
        </>
      )}
    </div>
  );
};

export default TirzName;
