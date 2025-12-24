"use client";

import { FC, useMemo, useState } from "react";
import {
  AffiliateBonusesSummary,
  Sort,
  AffiliateBonusList,
} from "@/types/affiliates";
import TimeFilters from "../Widgets/TimeFilters";
import BonusesTable from "./BonusesTable";
import BonusesSummary from "./BonusesSummary";
import TableSearch from "../Widgets/TableSearch";
import { fetcher } from "@/helpers/fetchers";
import useSWR from "swr";
import useStickyValue from "@/hooks/useStickyValue";
import { useAffiliateContext } from "../AffiliateContext";

interface AffiliateBonusesProps {
  bonusesSummary?: AffiliateBonusesSummary;
}

const AffiliateBonuses: FC<AffiliateBonusesProps> = ({ bonusesSummary }) => {
  const { affiliateInfo } = useAffiliateContext();

  const [page, setPage] = useState(0);
  const [sort, setSort] = useState<Sort>();
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [search, setSearch] = useState("");

  const queryParams = useMemo(() => {
    const params = new URLSearchParams();
    if (sort) {
      params.set("order_by", sort.key);
      params.set("order_dir", sort.direction);
    }
    if (page) {
      params.set("page", page.toString());
    }
    if (startDate && endDate) {
      params.set("date_from", startDate.toISOString());
      params.set("date_to", endDate.toISOString());
    }
    if (search) {
      params.set("search", search);
    }
    return params;
  }, [page, sort, startDate, endDate, search]);

  const { data: bonusesPre, isLoading } = useSWR<AffiliateBonusList>(
    `/api/affiliate/bonuses?${queryParams.toString()}`,
    fetcher
  );
  const bonuses = useStickyValue(bonusesPre);

  return (
    <div className="m-[auto] w-[100%] max-w-[1264px] sm:max-w-[100vw] md:max-w-[100vw]">
      <BonusesSummary
        fromDate={affiliateInfo?.affiliate?.date_created}
        summary={bonusesSummary}
      />
      <TimeFilters
        minDate={(affiliateInfo?.affiliate?.date_created ?? "").slice(0, 10)}
        maxDate={new Date().toISOString().slice(0, 10)}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        setPage={setPage}
        className="mb-4"
      />
      <div className="mb-4 flex items-center justify-end gap-4 sm:flex-col-reverse sm:items-start">
        <TableSearch label="Search bonus ID" onSearch={setSearch} />
      </div>
      <BonusesTable
        bonuses={bonuses}
        isLoading={isLoading}
        page={page}
        setPage={setPage}
        sort={sort}
        setSort={setSort}
      />
    </div>
  );
};

export default AffiliateBonuses;
