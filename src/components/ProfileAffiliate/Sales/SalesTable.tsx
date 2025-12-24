"use client";

import Table, { TableColumn } from "../Widgets/Table";
import TablePagination from "../Widgets/TablePagination";
import { AffiliateSale, AffiliateSaleList, Sort } from "@/types/affiliates";
import { formatDateSlash } from "@/helpers/date_format";
import { formatCurrency } from "@/helpers/curency_format";
import { Dispatch, FC, SetStateAction, useMemo, useState } from "react";

interface SalesTableProps {
  sales?: AffiliateSaleList;
  isLoading: boolean;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  sort?: Sort;
  setSort: Dispatch<SetStateAction<Sort | undefined>>;
}

const SalesTable: FC<SalesTableProps> = ({
  sales,
  isLoading,
  sort,
  setSort,
  page,
  setPage,
}) => {
  const tableColumns: TableColumn<AffiliateSale>[] = [
    { key: "id", title: "ID", isRowHeader: true, width: 10 },
    {
      key: "date_created",
      title: "Date",
      width: 10,
      render: (row) => formatDateSlash(row.date_created),
    },
    { key: "type", title: "Type", width: 10 },
    {
      key: "full_name",
      title: "Customer Name",
      width: 20,
      render: (row) => row?.user?.full_name || "Guest",
    },
    {
      key: "order_total",
      title: "Sale",
      width: 15,
      render: (row) => {
        const total = row?.order
          ? row?.order?.total - row?.order?.shipping - row?.order?.tax
          : undefined;
        if (total === undefined) return "--";
        return formatCurrency(total, true, false);
      },
    },
    { key: "reference_id", title: "Ref. ID", width: 10 },
    {
      key: "amount",
      title: "Earned",
      width: 15,
      render: (row) => formatCurrency(row?.amount ?? 0, true, false),
    },
  ];

  return (
    <>
      <Table
        columns={tableColumns}
        data={sales?.items ?? []}
        isLoading={isLoading}
        sort={sort}
        setSort={setSort}
      />
      <TablePagination
        totalPages={sales?.total_pages ?? 0}
        currentPage={page}
        setPage={setPage}
        className="mt-12"
      />
    </>
  );
};

export default SalesTable;
