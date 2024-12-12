import { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CalendarDaysIcon } from "lucide-react";

import Search from "@/components/ui/search";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { searchBills } from "@/services/bill";
import type { SearchBillsFilter } from "@/types/bill";

type FilterOptions = "all" | "payee" | "payer" | "contingent";

type FiltersProps = {
  selected: FilterOptions;
  onSelect: (filter: FilterOptions) => void;
};

const buildFilterPayload = ({
  search_term,
  date_range,
  role,
  currency,
}: {
  search_term?: string;
  date_range?: { from: string; to: string };
  role?: string;
  currency?: string;
}): { filter: SearchBillsFilter } => {
  const filterPayload: SearchBillsFilter = {};

  if (search_term) {
    filterPayload.search_term = search_term;
  }

  if (date_range) {
    filterPayload.date_range = date_range;
  }

  if (role) {
    filterPayload.role = role;
  }

  if (currency) {
    filterPayload.currency = currency;
  }

  return { filter: filterPayload };
};

function Filters({ selected, onSelect }: FiltersProps) {
  const [searchTerm, setSearchTerm] = useState("");
  // const [dateRange, setDateRange] = useState({ from: "", to: "" });
  const role = selected;

  const intl = useIntl();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async () => {
      const payload = buildFilterPayload({
        search_term: searchTerm,
        role,
      });

      return await searchBills(payload);
    },
    onSuccess: (data) => {
      console.log(data);

      queryClient.setQueryData(["bills"], data);
    },
  });

  const activeFilter = "!font-medium border-text-300";
  const isActive = (filter: FilterOptions) => selected === filter;

  return (
    <div className="flex flex-col gap-2">
      <Search
        onChange={setSearchTerm}
        size="sm"
        placeholder={intl.formatMessage({
          id: "Search for bills",
          defaultMessage: "Search for bills...",
          description: "Placeholder text for bills search input",
        })}
        onSearch={() => {
          mutate();
        }}
      />

      <div className="flex gap-2">
        <Button
          className={cn("filter", {
            [activeFilter]: isActive("all"),
          })}
          onClick={() => {
            onSelect("all");
          }}
          variant="filter"
          size="xs"
        >
          <FormattedMessage
            id="All"
            defaultMessage="All"
            description="Filter to view All bills"
          />
        </Button>

        <Button
          className={cn("filter", {
            [activeFilter]: isActive("payee"),
          })}
          onClick={() => {
            onSelect("payee");
          }}
          variant="filter"
          size="xs"
        >
          <FormattedMessage
            id="Payee"
            defaultMessage="Payee"
            description="Filter to view Payee bills"
          />
        </Button>

        <Button
          className={cn("filter", {
            [activeFilter]: isActive("payer"),
          })}
          onClick={() => {
            onSelect("payer");
          }}
          variant="filter"
          size="xs"
        >
          <FormattedMessage
            id="Payer"
            defaultMessage="Payer"
            description="Filter to view Payer bills"
          />
        </Button>

        <Button
          className={cn("filter", {
            [activeFilter]: isActive("contingent"),
          })}
          onClick={() => {
            onSelect("contingent");
          }}
          variant="filter"
          size="xs"
        >
          <FormattedMessage
            id="Contingent"
            defaultMessage="Contingent"
            description="Filter to view Contingent bills"
          />
        </Button>
      </div>
    </div>
  );
}

export default function Header() {
  const [selectedFilter, setSelectedFilter] = useState("all" as FilterOptions);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-medium text-text-300">
          <FormattedMessage
            id="Bills"
            defaultMessage="Bills"
            description="Title for Bills page"
          />
        </h2>

        <Button variant="link" className="gap-1 text-xs text-text-300 p-0">
          <CalendarDaysIcon size={16} strokeWidth={1} color="#1B0F00" />

          <FormattedMessage
            id="Select date"
            defaultMessage="Select dates"
            description="Button to filter bills by date range"
          />
        </Button>
      </div>

      <Filters selected={selectedFilter} onSelect={setSelectedFilter} />
    </div>
  );
}
