"use client";

import { Dispatch, FC, SetStateAction } from "react";
import Table, { TableColumn } from "../Widgets/Table";
import TablePagination from "../Widgets/TablePagination";
import { AffiliatePayout, AffiliateBonusList, Sort } from "@/types/affiliates";
import { formatDateSlash } from "@/helpers/date_format";
import { formatCurrency } from "@/helpers/curency_format";

interface BonusesTableProps {
  bonuses?: AffiliateBonusList;
  isLoading: boolean;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  sort?: Sort;
  setSort: Dispatch<SetStateAction<Sort | undefined>>;
}

const BonusesTable: FC<BonusesTableProps> = ({
  bonuses,
  isLoading,
  page,
  setPage,
  sort,
  setSort,
}) => {
  const tableColumns: TableColumn<AffiliatePayout>[] = [
    {
      key: "id",
      title: "Bonus ID",
      isRowHeader: true,
      width: 25,
    },
    {
      key: "description",
      title: "Description",
      width: 25,
    },
    {
      key: "date_created",
      title: "Date",
      width: 25,
      render: (row) =>
        row.date_created ? formatDateSlash(row.date_created) : "--",
    },
    {
      key: "amount",
      title: "Amount",
      width: 25,
      render: (row) => formatCurrency(row?.amount ?? 0, true, false),
    },
  ];

  return (
    <>
      <Table
        columns={tableColumns}
        data={bonuses?.items ?? []}
        isLoading={isLoading}
        sort={sort}
        setSort={setSort}
      />
      <TablePagination
        totalPages={bonuses?.total_pages ?? 0}
        currentPage={page}
        setPage={setPage}
        className="mt-12"
      />
    </>
  );
};

export default BonusesTable;
