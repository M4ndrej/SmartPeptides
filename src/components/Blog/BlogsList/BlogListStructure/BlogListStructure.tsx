"use client";

import { UPDATE_BLOG_VEIW_MODE } from "@/context/constants";
import { useThemeContext } from "@/context/theme-provider";
import classNames from "classnames";

const BlogListStructure = () => {
  const themeContext: any = useThemeContext();
  const { blogViewMode } = themeContext.state;
  return (
    <div
      className={classNames({
        "mb-[16px] mt-[105px] flex items-center justify-end pr-[3px] sm:mt-[97px]":
          true,
      })}
    >
      <div
        className={classNames({
          "cursor-pointer": true,
          "[&_path]:stroke-[#9A9A9F]": blogViewMode == "image",
          "[&_path]:stroke-gray2 [&_path]:hover:stroke-[#9A9A9F]":
            blogViewMode == "text",
        })}
        onClick={() =>
          themeContext.dispatch({
            type: UPDATE_BLOG_VEIW_MODE,
            payload: "image",
          })
        }
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          className="h-[20px] w-[20px] "
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.23875 3.33337H14.7626C15.2677 3.33337 15.7522 3.53405 16.1094 3.89127C16.4666 4.24848 16.6673 4.73296 16.6673 5.23814V14.7619C16.6673 15.2671 16.4666 15.7516 16.1094 16.1088C15.7522 16.466 15.2677 16.6667 14.7626 16.6667H5.23875C4.73357 16.6667 4.24909 16.466 3.89188 16.1088C3.53466 15.7516 3.33398 15.2671 3.33398 14.7619V5.23814C3.33398 4.73296 3.53466 4.24848 3.89188 3.89127C4.24909 3.53405 4.73357 3.33337 5.23875 3.33337Z"
            stroke="#9A9A9F"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16.6673 12.8572L13.8102 10.0001L10.953 12.843M14.7626 16.6668L6.19113 8.09534L3.33398 10.9525"
            stroke="#9A9A9F"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M13.3332 7.61912C13.8592 7.61912 14.2856 7.19272 14.2856 6.66674C14.2856 6.14075 13.8592 5.71436 13.3332 5.71436C12.8073 5.71436 12.3809 6.14075 12.3809 6.66674C12.3809 7.19272 12.8073 7.61912 13.3332 7.61912Z"
            fill="#9A9A9F"
          />
        </svg>
      </div>
      <div
        className={classNames({
          "ml-[8px] cursor-pointer text-[16px]": true,
          "text-gray2 hover:text-gray": blogViewMode == "image",
          "text-darkgray": blogViewMode == "text",
        })}
        onClick={() =>
          themeContext.dispatch({
            type: UPDATE_BLOG_VEIW_MODE,
            payload: "text",
          })
        }
      >
        A
      </div>
    </div>
  );
};

export default BlogListStructure;
