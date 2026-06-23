"use client";
import { useThemeContext } from "@/context/theme-provider";
import { useState, useRef, FC } from "react";
import classNames from "classnames";
import DropdownIcon from "@/components/Icons/DropdownIcon";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import MoonIcon from "../Icons/MoonIcon";
import SunIcon from "../Icons/SunIcon";
import SystemIcon from "../Icons/SystemIcon";

interface ThemeToggleButtonProps {
  isSmaller?: boolean;
  width?: number;
  height?: number;
}

const ThemeToggleButton: FC<ThemeToggleButtonProps> = ({
  isSmaller,
  width,
  height,
}) => {
  const { state, dispatch } = useThemeContext();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const elRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(elRef, () => setDropdownOpen(false));

  const options = [
    {
      icon: (
        <SystemIcon
          isActive={state.themeMode === "system"}
          className={classNames(
            "group-hover/selectMode:fill-[#333333} group-hover/toggleBtn:fill-[#333333}"
          )}
          width={32}
          height={32}
        />
      ),
      label: "System",
      value: "system",
    },
    {
      icon: (
        <SunIcon
          isActive={state.themeMode === "light"}
          className={classNames(
            "group-hover/selectMode:fill-[#333333} group-hover/toggleBtn:fill-[#333333}"
          )}
          width={32}
          height={32}
        />
      ),
      label: "Light",
      value: "light",
    },
    {
      icon: (
        <MoonIcon
          isActive={state.themeMode === "dark"}
          className={classNames(
            "group-hover/selectMode:fill-[#333333} group-hover/toggleBtn:fill-[#333333}"
          )}
          width={32}
          height={32}
        />
      ),
      label: "Dark",
      value: "dark",
    },
  ];

  const handleChange = (value: string) => {
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const isDark =
      value === "dark" || (value === "system" && systemPrefersDark);

    dispatch({ type: "TOGGLE_DARK_MODE", payload: isDark });
    dispatch({ type: "SET_THEME_MODE", payload: value });
    setDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  return (
    <div
      className={classNames(
        "relative ml-0 flex items-center rounded-[5px] rounded-b-none xl:ml-1 xl:px-2 xl:py-1",
        dropdownOpen ? "bg-lightgray" : ""
      )}
      ref={elRef}
    >
      <button
        type="button"
        className={classNames(
          "group/toggleBtn flex items-center justify-center gap-2 text-black transition-opacity  focus:outline-none xl:px-2 xl:py-1"
        )}
        onClick={toggleDropdown}
      >
        <span>
          {state.themeMode === "dark" ? (
            <MoonIcon
              className={classNames(
                "group-hover/toggleBtn:!fill-[#333333} !fill-black transition duration-200"
              )}
              width={!isSmaller ? 32 : width}
              height={!isSmaller ? 32 : height}
            />
          ) : state.themeMode === "light" ? (
            <SunIcon
              className={classNames(
                "group-hover/toggleBtn:!fill-[#333333} !fill-black transition duration-200"
              )}
              width={!isSmaller ? 32 : width}
              height={!isSmaller ? 32 : height}
            />
          ) : (
            <SystemIcon
              className={classNames(
                "group-hover/toggleBtn:!fill-[#333333} !fill-black transition duration-200"
              )}
              width={!isSmaller ? 32 : width}
              height={!isSmaller ? 32 : height}
            />
          )}
        </span>
        <DropdownIcon
          className={classNames(
            "group-hover/toggleBtn:!stroke-[#333333} hidden transition duration-200 xl:block",
            dropdownOpen ? "rotate-[180deg]" : "rotate-0"
          )}
        />
      </button>

      <ul
        className={classNames(
          "absolute right-0 top-[24px] z-50 grid min-w-[168px] gap-[10px] rounded-[5px] rounded-tr-none bg-lightgray p-2 transition-all duration-200 ease-in-out xl:top-[44px]",
          dropdownOpen
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-3 opacity-0"
        )}
      >
        {options.map((option) => (
          <li key={option.value}>
            <button
              type="button"
              disabled={option.value === state.themeMode}
              className={classNames(
                "font-14px-ALL group/selectMode hover:fill-[#333333} flex items-center gap-[8px] text-gray2 transition duration-200 hover:text-[#333333] focus:outline-none",
                { "!text-[#333333}": option.value === state.themeMode }
              )}
              onClick={() => handleChange(option.value)}
            >
              {option.icon}
              <span>{option.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ThemeToggleButton;
