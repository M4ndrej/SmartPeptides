import { Dispatch, FC, SetStateAction } from "react";
import classNames from "classnames";
import { determinePages } from "@/helpers/table_helper";

interface TablePaginationProps {
  totalPages: number;
  currentPage?: number;
  setPage: Dispatch<SetStateAction<number>>;
  className?: string;
}

const TablePagination: FC<TablePaginationProps> = ({
  totalPages,
  currentPage = 0,
  setPage,
  className,
}) => {
  const pages = determinePages(totalPages, currentPage);
  const showFirst = currentPage !== 0 && totalPages > 4;
  const showLast = currentPage !== totalPages - 1 && totalPages > 4;
  if (!pages.length) return null;
  return (
    <div
      className={classNames(
        "flex w-full items-center justify-center gap-4",
        className
      )}
    >
      {showFirst && (
        <button
          key={"first"}
          id={"first"}
          type="button"
          className={classNames(
            `inline-flex h-6 w-6 select-none items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap rounded-[5px] border-none font-medium text-gray3 !transition-all !duration-300 hover:bg-gray`,
            currentPage === 0 && "bg-[#E7461E] text-white hover:!bg-[#E7461E]"
          )}
          onClick={() => setPage(0)}
        >
          {"<<"}
        </button>
      )}
      {pages.map((number) => (
        <button
          key={number}
          id={number.toString()}
          type="button"
          className={classNames(
            `inline-flex h-6 w-6 select-none items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap rounded-[5px] border-none font-medium text-gray3 !transition-all !duration-300 hover:bg-gray`,
            currentPage === number &&
              "bg-[#E7461E] text-white hover:!bg-[#E7461E]"
          )}
          onClick={() => setPage(number)}
        >
          {number + 1}
        </button>
      ))}
      {showLast && (
        <button
          key={"last"}
          id={"last"}
          type="button"
          className={classNames(
            `inline-flex h-6 w-6 select-none items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap rounded-[5px] border-none font-medium text-gray3 !transition-all !duration-300 hover:bg-gray`,
            currentPage === totalPages - 1 &&
              "bg-[#E7461E] text-white hover:!bg-[#E7461E]"
          )}
          onClick={() => setPage(totalPages - 1)}
        >
          {">>"}
        </button>
      )}
    </div>
  );
};

export default TablePagination;
