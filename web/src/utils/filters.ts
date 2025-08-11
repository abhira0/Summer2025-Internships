import type { Job } from "@/types/job";

export type TextCondition =
  | { type: "contains"; value: string }
  | { type: "equals"; value: string }
  | { type: "not-equals"; value: string }
  | { type: "not-contains"; value: string }
  | { type: "regex"; value: string }
  | { type: "not-regex"; value: string };

export type ActiveFilter =
  | { column: "date_posted"; fromDate?: string; toDate?: string }
  | { column: "hidden"; hidden: boolean }
  | { column: "active"; active: boolean }
  | {
      column: "company_name" | "title" | "locations";
      conditions: TextCondition[];
      conditionType: "AND" | "OR";
    };

export const applyFilters = (
  jobs: Job[],
  activeFilters: ActiveFilter[] | undefined,
  getApplicationStatus: (jobId: string, type: "hidden") => boolean,
  username?: string | null
): Job[] => {
  if (!activeFilters || activeFilters.length === 0) return jobs;

  return jobs.filter((job) => {
    return activeFilters.every((filter) => {
      switch (filter.column) {
        case "date_posted": {
          const jobDate = new Date(job.date_posted);
          const fromDate = filter.fromDate
            ? new Date(filter.fromDate)
            : new Date(-8640000000000000);
          const toDate = filter.toDate
            ? new Date(filter.toDate)
            : new Date(8640000000000000);
          return jobDate >= fromDate && jobDate <= toDate;
        }
        case "hidden":
          return filter.hidden === getApplicationStatus(job.id, "hidden");
        case "active":
          return filter.active === job.active;
        // Gracefully ignore legacy/unknown boolean filters (e.g., "applied")
        case "applied":
          return true;
        default: {
          const text = String((job as any)[(filter as any).column] ?? "").toLowerCase();
          const conditions = Array.isArray((filter as any).conditions)
            ? ((filter as any).conditions as TextCondition[])
            : [];
          if (conditions.length === 0) return true;

          const evaluate = (c: TextCondition) => {
            const cv = String(c.value ?? "").toLowerCase();
            switch (c.type) {
              case "contains":
                return text.includes(cv);
              case "equals":
                return text === cv;
              case "not-equals":
                return text !== cv;
              case "not-contains":
                return !text.includes(cv);
              case "regex":
                try {
                  return new RegExp(cv, "i").test(text);
                } catch {
                  return false;
                }
              case "not-regex":
                try {
                  return !new RegExp(cv, "i").test(text);
                } catch {
                  return true;
                }
              default:
                return true;
            }
          };

          const conditionType = (filter as any).conditionType === "AND" ? "AND" : "OR";
          return conditionType === "AND"
            ? conditions.every(evaluate)
            : conditions.some(evaluate);
        }
      }
    });
  });
};



