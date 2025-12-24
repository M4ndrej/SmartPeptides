"use client";

import { Dispatch, FC, SetStateAction } from "react";
import Table, { TableColumn } from "../Widgets/Table";
import TablePagination from "../Widgets/TablePagination";
import {
  AffiliateCustomer,
  AffiliateCustomerList,
  Sort,
} from "@/types/affiliates";
import { formatDateSlash } from "@/helpers/date_format";
import { formatCurrency } from "@/helpers/curency_format";

interface LifetimeReferralsTableProps {
  customers?: AffiliateCustomerList;
  isLoading: boolean;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  sort?: Sort;
  setSort: Dispatch<SetStateAction<Sort | undefined>>;
}

const LifetimeReferralsTable: FC<LifetimeReferralsTableProps> = ({
  customers,
  isLoading,
  page,
  setPage,
  sort,
  setSort,
}) => {
  const tableColumns: TableColumn<AffiliateCustomer>[] = [
    {
      key: "full_name",
      title: "Customer Name",
      width: 35,
      render: (row) => row?.full_name || row.display_name || "Guest",
    },
    {
      key: "join_date",
      title: "Join Date",
      width: 20,
      render: (row) => (row.join_date ? formatDateSlash(row.join_date) : "--"),
    },
    { key: "sales", title: "Sales", width: 10 },
    {
      key: "total_revenue",
      title: "Amount",
      width: 20,
      render: (row) => formatCurrency(row?.total_revenue ?? 0, true, false),
    },
    {
      key: "earned",
      title: "Earned",
      width: 15,
      render: (row) => formatCurrency(row?.earned ?? 0, true, false),
    },
  ];

  return (
    <>
      <Table
        columns={tableColumns}
        data={customers?.items ?? []}
        isLoading={isLoading}
        sort={sort}
        setSort={setSort}
        rowKey="email"
      />
      <TablePagination
        totalPages={customers?.total_pages ?? 0}
        currentPage={page}
        setPage={setPage}
        className="mt-12"
      />
    </>
  );
};

export default LifetimeReferralsTable;
