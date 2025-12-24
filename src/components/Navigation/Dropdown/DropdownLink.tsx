import classNames from "classnames";

interface DropdownListProps {
  page: { title: string; link: string };
  toggleDropdownHandler: (
    e: React.MouseEvent<HTMLDivElement>,
    title: string
  ) => void;
  isDropdownOpen: boolean;
  isActivePage: boolean;
}

export const DropdownLink: React.FC<DropdownListProps> = ({
  page,
  toggleDropdownHandler,
  isDropdownOpen,
  isActivePage,
}) => {
  return (
    <div
      className=" cursor-pointer"
      onClick={(e) => toggleDropdownHandler(e, page.title)}
    >
      <div className="py-2 pl-4">{page.title}</div>
      <div className="absolute right-[16px] top-[8px] z-[333] flex h-[25px] w-[25px] items-center justify-end xl:hidden">
        <svg
          width="13"
          height="7"
          viewBox="0 0 13 7"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={classNames(
            "text-white transition duration-200 group-hover:stroke-white",
            {
              "rotate-[-90deg]": isDropdownOpen,
            }
          )}
        >
          <path
            d="M1 1L6.5 6L12 1"
            stroke="#333333"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={classNames(
              "!group-hover:stroke-textWhite !stroke-textWhite transition duration-300 ",
              {
                "stroke-[#E7461E]": isActivePage,
              }
            )}
          />
        </svg>
      </div>
    </div>
  );
};
