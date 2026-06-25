"use client";
import { UPDATE_VIEW_MODE } from "@/context/constants";
import { ThemeContext } from "@/context/theme-provider";
import { FC, useState, useContext } from "react";

const GridModes: FC = ({}) => {
  const appContext: any = useContext(ThemeContext);
  const { viewMode } = appContext.state;
  const [hoverViewMode, setHoverViewMode] = useState("");

  const handleViewMode = (mode: string) => {
    appContext.dispatch({ type: UPDATE_VIEW_MODE, payload: mode });
  };

  return (
    <div className="sm:hidden md:pb-0">
      <div className="flex items-center">
        <svg
          width="22"
          height="16"
          viewBox="0 0 22 16"
          fill="none"
          className="mr-[16px] cursor-pointer md:hidden lg:hidden xl:block"
          onClick={() => handleViewMode("5x5")}
          onMouseEnter={() => setHoverViewMode("5x5")}
          onMouseLeave={() => setHoverViewMode("")}
        >
          <path
            d="M11 1L11 15"
            stroke={
              viewMode == "5x5" || hoverViewMode == "5x5"
                ? "#9A9A9F"
                : "#999999"
            }
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M6 1L6 15"
            stroke={
              viewMode == "5x5" || hoverViewMode == "5x5"
                ? "#9A9A9F"
                : "#999999"
            }
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M1 1L0.999999 15"
            stroke={
              viewMode == "5x5" || hoverViewMode == "5x5"
                ? "#9A9A9F"
                : "#999999"
            }
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M16 1L16 15"
            stroke={
              viewMode == "5x5" || hoverViewMode == "5x5"
                ? "#9A9A9F"
                : "#999999"
            }
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M21 1L21 15"
            stroke={
              viewMode == "5x5" || hoverViewMode == "5x5"
                ? "#9A9A9F"
                : "#999999"
            }
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>

        <svg
          width="17"
          height="16"
          viewBox="0 0 17 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mr-[16px] cursor-pointer md:hidden lg:block xl:block"
          onClick={() => handleViewMode("4x4")}
          onMouseEnter={() => setHoverViewMode("4x4")}
          onMouseLeave={() => setHoverViewMode("")}
        >
          <path
            d="M6 1L6 15"
            stroke={
              viewMode == "4x4" || hoverViewMode == "4x4"
                ? "#9A9A9F"
                : "#999999"
            }
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M1 1L0.999999 15"
            stroke={
              viewMode == "4x4" || hoverViewMode == "4x4"
                ? "#9A9A9F"
                : "#999999"
            }
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M11 1L11 15"
            stroke={
              viewMode == "4x4" || hoverViewMode == "4x4"
                ? "#9A9A9F"
                : "#999999"
            }
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M16 1L16 15"
            stroke={
              viewMode == "4x4" || hoverViewMode == "4x4"
                ? "#9A9A9F"
                : "#999999"
            }
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        <svg
          width="12"
          height="16"
          viewBox="0 0 12 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mr-[16px] cursor-pointer"
          onClick={() => handleViewMode("3x3")}
          onMouseEnter={() => setHoverViewMode("3x3")}
          onMouseLeave={() => setHoverViewMode("")}
        >
          <path
            d="M1 1L0.999999 15"
            stroke={
              viewMode == "3x3" || hoverViewMode == "3x3"
                ? "#9A9A9F"
                : "#999999"
            }
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M6 1L6 15"
            stroke={
              viewMode == "3x3" || hoverViewMode == "3x3"
                ? "#9A9A9F"
                : "#999999"
            }
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M11 1L11 15"
            stroke={
              viewMode == "3x3" || hoverViewMode == "3x3"
                ? "#9A9A9F"
                : "#999999"
            }
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        <svg
          width="21"
          height="16"
          viewBox="0 0 21 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="cursor-pointer"
          onClick={() => handleViewMode("rows")}
          onMouseEnter={() => setHoverViewMode("rows")}
          onMouseLeave={() => setHoverViewMode("")}
        >
          <path
            d="M19.9995 1L7.99951 0.999998"
            stroke={
              viewMode == "rows" || hoverViewMode == "rows"
                ? "#9A9A9F"
                : "#999999"
            }
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M19.9995 8L7.99951 8"
            stroke={
              viewMode == "rows" || hoverViewMode == "rows"
                ? "#9A9A9F"
                : "#999999"
            }
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M19.9995 15L7.99951 15"
            stroke={
              viewMode == "rows" || hoverViewMode == "rows"
                ? "#9A9A9F"
                : "#999999"
            }
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M2.99951 1L0.999512 1"
            stroke={
              viewMode == "rows" || hoverViewMode == "rows"
                ? "#9A9A9F"
                : "#999999"
            }
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M2.99951 8L0.999512 8"
            stroke={
              viewMode == "rows" || hoverViewMode == "rows"
                ? "#9A9A9F"
                : "#999999"
            }
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M2.99951 15L0.999512 15"
            stroke={
              viewMode == "rows" || hoverViewMode == "rows"
                ? "#9A9A9F"
                : "#999999"
            }
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
};

export default GridModes;
