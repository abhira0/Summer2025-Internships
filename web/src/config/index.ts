import type { ActiveFilter } from "@/utils/filters";
import type { SortSpec } from "@/utils/sorts";

type AppConfig = {
  api: { listings: string };
  defaults: {
    filters: ActiveFilter[];
    sorts: SortSpec[];
    pagination: { itemsPerPage: number };
  };
};

const config: AppConfig = {
  api: {
    listings:
      "https://raw.githubusercontent.com/SimplifyJobs/New-Grad-Positions/refs/heads/dev/.github/scripts/listings.json",
  },
  defaults: {
    filters: [
      { column: "date_posted", fromDate: "2024-01-01", toDate: "" },
      { column: "active", active: true },
      {
        column: "locations",
        conditionType: "AND",
        conditions: [
          { type: "not-equals", value: "canada" },
          { type: "not-equals", value: "remote in canada" },
          { type: "not-regex", value: "^[a-zA-Z]+, uk$" },
          { type: "not-regex", value: "^[a-zA-Z]+(?:, [a-za-z]+)?, canada$" },
        ],
      },
      { column: "hidden", hidden: false },
      { column: "applied", applied: false },
    ] as ActiveFilter[],
    sorts: [{ column: "date_posted", order: "desc" }] as SortSpec[],
    pagination: {
      itemsPerPage: 25,
    },
  },
};

export default config;


