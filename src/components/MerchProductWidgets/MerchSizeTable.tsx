import classNames from "classnames";
import { FC } from "react";

interface MerchSizeTableProps {
  tableData: Record<string, number | string>[];
  sideText: string;
  isMobile?: boolean;
}

const MerchSizeTable: FC<MerchSizeTableProps> = ({
  tableData,
  sideText,
  isMobile,
}) => {
  const columns = Object.keys(tableData[0]);
  const mobileColumns = ["In Inches", "Lenght", "Chest"];

  const mobileData = columns.map((col) => {
    const rowData = tableData.map((row) => row[col]);
    return {
      [mobileColumns[0]]: col,
      [mobileColumns[1]]: rowData[0],
      [mobileColumns[2]]: rowData[1],
    };
  });

  const dataToShow = isMobile ? mobileData.slice(1) : tableData;
  const colsToShow = isMobile ? mobileColumns : columns;

  return (
    <div className="relative flex min-h-[180px] w-full items-center justify-start gap-0 overflow-hidden rounded-[5px] sm:justify-center md:justify-center">
      {!isMobile && (
        <div className="flex h-full min-h-[180px] w-8 items-center justify-center bg-[#333333] text-white">
          <div className="h-full -rotate-90 text-center">{sideText}</div>
        </div>
      )}
      <table className="min-h-[180px]">
        <thead>
          <tr>
            {colsToShow.map((col, i) => (
              <th
                key={col}
                className={classNames(
                  "h-[65px] min-w-[70px] text-center",
                  !isMobile || (isMobile && i === 0)
                    ? "bg-lightgray"
                    : "border-2 border-lightgray bg-white"
                )}
              >
                <span className="block p-2">{col}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataToShow.map((row, i) => (
            <tr key={i}>
              {colsToShow.map((col, i) => (
                <td
                  key={col}
                  className={classNames(
                    "h-[55px] min-w-[70px] text-center",
                    isMobile && i === 0
                      ? "bg-lightgray font-bold"
                      : "border-2 border-lightgray bg-white"
                  )}
                >
                  <span className="block p-2">{row[col]}</span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MerchSizeTable;
