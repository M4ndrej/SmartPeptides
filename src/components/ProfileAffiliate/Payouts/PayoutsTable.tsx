"use client";

import { Dispatch, FC, SetStateAction } from "react";
import Table, { TableColumn } from "../Widgets/Table";
import TablePagination from "../Widgets/TablePagination";
import { AffiliatePayout, AffiliatePayoutList, Sort } from "@/types/affiliates";
import { formatDateSlash } from "@/helpers/date_format";
import { formatCurrency } from "@/helpers/curency_format";

interface PayoutsTableProps {
  payouts?: AffiliatePayoutList;
  isLoading: boolean;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  sort?: Sort;
  setSort: Dispatch<SetStateAction<Sort | undefined>>;
}

const PayoutsTable: FC<PayoutsTableProps> = ({
  payouts,
  isLoading,
  page,
  setPage,
  sort,
  setSort,
}) => {
  const tableColumns: TableColumn<AffiliatePayout>[] = [
    {
      key: "id",
      title: "Payout ID",
      isRowHeader: true,
      width: 25,
    },
    {
      key: "description",
      title: "Method",
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
        data={payouts?.items ?? []}
        isLoading={isLoading}
        sort={sort}
        setSort={setSort}
      />
      <TablePagination
        totalPages={payouts?.total_pages ?? 0}
        currentPage={page}
        setPage={setPage}
        className="mt-12"
      />
    </>
  );
};

export default PayoutsTable;
