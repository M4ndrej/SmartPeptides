"use client";

import { Sort } from "@/types/affiliates";
import classNames from "classnames";
import { Dispatch, Fragment, ReactElement, SetStateAction } from "react";
import Spinner from "../../SvgComponents/Spinner";
import SortIcon from "../../Icons/SortIcon";
import useScreenSize from "@/hooks/useScreenSize";

export type TableColumn<T> = {
  key: string;
  title: string;
  isSortable?: boolean;
  isRowHeader?: boolean;
  width?: number;
  render?: (row: T) => string | number | ReactElement;
};

export type TableData = Record<string, any>;

interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  isLoading: boolean;
  sort: Sort | undefined;
  setSort: Dispatch<SetStateAction<Sort | undefined>>;
  emptyMessage?: string;
  rowKey?: string;
}

const Table = <T extends TableData>({
  columns,
  data,
  isLoading,
  sort,
  setSort,
  emptyMessage = "No records found for the date range selected.",
  rowKey,
}: TableProps<T>): ReactElement => {
  const screenSize = useScreenSize();

  const rowHeaderKey =
    rowKey ?? columns.find((column) => column.isRowHeader)?.key ?? "id";

  const handleSort = (column: TableColumn<T>) => {
    if (column?.isSortable === false) return;
    if (sort?.key === column.key) {
      setSort({
        key: column.key,
        direction: sort.direction === "ASC" ? "DESC" : "ASC",
      });
    } else {
      setSort({ key: column.key, direction: "ASC" });
    }
  };

  return (
    <table className="w-full text-center">
      {/* Header */}
      <thead className="sm:hidden">
        <tr key="table-header" className="bg-lightgray">
          {columns.map((column, i) => (
            <th
              key={`${column.key}-${i}`}
              onClick={() => handleSort(column)}
              className={classNames(
                "font-D14px-M13px whitespace-nowrap p-[10px] font-medium sm:p-2 sm:px-4 sm:text-left md:p-2 md:px-4 md:text-left",
                i === 0 && "rounded-l-[5px]",
                i === columns.length - 1 && "rounded-r-[5px]",
                column?.isSortable !== false && "cursor-pointer",
                column?.isSortable !== false &&
                  sort?.key === column.key &&
                  "bg-[#f0f0f0] dark:bg-transparent"
              )}
              style={{ width: column?.width ? `${column.width}%` : "auto" }}
            >
              {column?.isSortable !== false && sort?.key === column.key && (
                <SortIcon
                  width={16}
                  height={16}
                  className={classNames(
                    "mr-2 inline-block",
                    sort?.direction === "DESC" && "scale-y-[-1]"
                  )}
                />
              )}
              {column.title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="w-full">
        {/* Loading */}
        {isLoading && (
          <tr key="empty-row">
            <td colSpan={columns.length} className="h-40">
              <div className="flex w-full items-center justify-center">
                <Spinner widthHeight="h-8 w-8" />
              </div>
            </td>
          </tr>
        )}
        {/* Body */}
        {!!data.length &&
          !isLoading &&
          data.map((row, i) =>
            screenSize?.width < 768 ? (
              // Mobile
              <div
                key={row?.[rowHeaderKey as keyof T] ?? i}
                className={classNames(
                  "grid grid-cols-4 items-center rounded-[5px] border-[2px] border-lightgray",
                  i !== data.length - 1 && "mb-4"
                )}
              >
                {columns.map((col) => (
                  <Fragment key={col.key}>
                    {/* Mobile Headers */}
                    <div className="font-D14px-M13px bg-lightgray px-4 py-2 text-left font-semibold">
                      {col.title}
                    </div>
                    <td className="font-D14px-M13px col-span-3 px-4 py-2 text-left md:text-left">
                      {col?.render?.(row) ?? row[col.key as keyof T] ?? "--"}
                    </td>
                  </Fragment>
                ))}
              </div>
            ) : (
              // Desktop
              <tr key={row?.[rowHeaderKey as keyof T] ?? i}>
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className="font-D14px-M13px p-2 sm:ml-4 sm:block sm:p-2 sm:py-2 sm:pl-0 sm:text-left md:ml-4 md:p-2 md:py-2 md:pl-0 md:text-left"
                  >
                    {col?.render?.(row) ?? row[col.key as keyof T] ?? "--"}
                  </td>
                ))}
              </tr>
            )
          )}
        {/* Empty State */}
        {!data.length && !isLoading && (
          <tr key="empty-row">
            <td colSpan={columns.length} className="h-20">
              <div className="flex w-full items-center justify-center">
                {emptyMessage}
              </div>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default Table;
