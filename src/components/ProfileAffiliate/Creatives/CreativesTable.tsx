"use client";

import { Dispatch, FC, SetStateAction } from "react";
import Table, { TableColumn } from "../Widgets/Table";
import { AffiliateCreative, Sort } from "@/types/affiliates";

interface CreativesTableProps {
  creatives?: AffiliateCreative[];
  isLoading: boolean;
  sort?: Sort;
  setSort: Dispatch<SetStateAction<Sort | undefined>>;
}

const CreativesTable: FC<CreativesTableProps> = ({
  creatives,
  isLoading,
  sort,
  setSort,
}) => {
  const tableColumns: TableColumn<AffiliateCreative>[] = [
    {
      key: "type",
      title: "Type",
      isRowHeader: true,
      width: 30,
    },
    {
      key: "name",
      title: "Name",
      width: 70,
      render: (row) => row.name.charAt(0).toUpperCase() + row.name.slice(1),
    },
  ];

  return (
    <>
      <p className="font-D16px-M15px mb-4 font-bold">
        The following creatives are available for publication
      </p>
      <Table
        columns={tableColumns}
        data={creatives ?? []}
        isLoading={isLoading}
        sort={sort}
        setSort={setSort}
      />
    </>
  );
};

export default CreativesTable;
