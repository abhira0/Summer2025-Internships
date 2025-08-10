"use client";

import { useApplications } from "@/context/ApplicationsContext";
import type { Job } from "@/types/job";
import type { SortSpec } from "@/utils/sorts";

type Props = {
  jobs: Job[];
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  totalPages: number;
  totalCount: number;
  activeSorts: SortSpec[];
  setActiveSorts: (s: SortSpec[]) => void;
  searchQuery: string;
};

export default function JobsTable({ jobs, pageSize, currentPage, onPageChange, onPageSizeChange, totalPages, totalCount, activeSorts, setActiveSorts, searchQuery }: Props) {
  const { getApplicationStatus, updateApplication } = useApplications();
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalCount);

  const primarySort = activeSorts[0];

  const onHeaderClick = (
    e: React.MouseEvent,
    column: SortSpec["column"]
  ) => {
    const isShift = e.shiftKey;
    const isCtrl = e.ctrlKey || e.metaKey;

    const existingIndex = activeSorts.findIndex((s) => s.column === column);
    const existing = existingIndex >= 0 ? activeSorts[existingIndex] : undefined;

    // Ctrl/Cmd-click: remove column from sort sequence
    if (isCtrl) {
      if (existingIndex >= 0) {
        const next = activeSorts.filter((s) => s.column !== column);
        setActiveSorts(next);
      }
      return;
    }

    // Shift-click: add or toggle without reordering others (add to front if new)
    if (isShift) {
      if (existing) {
        const next = [...activeSorts];
        next[existingIndex] = {
          column,
          order: existing.order === "asc" ? "desc" : "asc",
        };
        setActiveSorts(next);
      } else {
        setActiveSorts([{ column, order: "asc" }, ...activeSorts]);
      }
      return;
    }

    // Plain click: make it primary, toggle if already primary. Keep other tie-breakers.
    if (existing) {
      const rest = activeSorts.filter((s) => s.column !== column);
      const newPrimary: SortSpec = {
        column,
        order:
          existingIndex === 0
            ? existing.order === "asc" ? "desc" : "asc"
            : existing.order,
      };
      setActiveSorts([newPrimary, ...rest]);
    } else {
      setActiveSorts([{ column, order: "asc" }, ...activeSorts]);
    }
  };

  const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const highlight = (text: string, query: string) => {
    if (!query) return text;
    try {
      const parts = text.split(new RegExp(`(${escapeRegExp(query)})`, "ig"));
      return (
        <>
          {parts.map((part, i) =>
            part.toLowerCase() === query.toLowerCase() ? (
              <mark key={i} className="bg-yellow-700/60 text-current px-0.5 rounded">
                {part}
              </mark>
            ) : (
              <span key={i}>{part}</span>
            )
          )}
        </>
      );
    } catch {
      return text;
    }
  };

  const Pagination = () => (
    <div className="flex flex-wrap gap-3 justify-between items-center bg-gray-800 px-4 py-3 rounded-lg border border-default">
      <div className="text-sm text-gray-400">
        Showing {totalCount > 0 ? startIndex + 1 : 0} to {endIndex} of {totalCount} results
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 text-sm bg-gray-700 text-white rounded hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <span className="px-1 py-1 text-sm text-gray-400">Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 text-sm bg-gray-700 text-white rounded hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
        <div className="ml-2 flex items-center gap-2">
          <label className="text-sm text-muted">Page size</label>
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="rounded-md border border-default bg-gray-900 text-gray-100 px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-white/20"
          >
            {[10, 25, 50, 100].map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );

  const handleStatusToggle = async (jobId: string, type: "hidden" | "applied") => {
    const current = getApplicationStatus(jobId, type);
    await updateApplication(jobId, type, !current);
  };

  return (
    <div className="flex flex-col space-y-4">
      <Pagination />
      <div className="hidden lg:block overflow-x-auto rounded-lg border border-default">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-900/40 text-left text-sm text-gray-300">
              <th
                className="px-4 py-3 cursor-pointer select-none"
                onClick={(e) => onHeaderClick(e, "company_name")}
                title="Sort by company. Click: make primary/toggle. Shift+Click: add/toggle. Ctrl/Cmd: remove."
              >
                Company
                {(() => {
                  const idx = activeSorts.findIndex((s) => s.column === "company_name");
                  if (idx === -1) return null;
                  const spec = activeSorts[idx];
                  return (
                    <span className="ml-1 text-gray-400">
                      {spec.order === "asc" ? "↑" : "↓"}
                      <sup className="ml-0.5 text-[10px] align-top">{idx + 1}</sup>
                    </span>
                  );
                })()}
              </th>
              <th
                className="px-4 py-3 cursor-pointer select-none"
                onClick={(e) => onHeaderClick(e, "title")}
                title="Sort by role. Click: make primary/toggle. Shift+Click: add/toggle. Ctrl/Cmd: remove."
              >
                Role
                {(() => {
                  const idx = activeSorts.findIndex((s) => s.column === "title");
                  if (idx === -1) return null;
                  const spec = activeSorts[idx];
                  return (
                    <span className="ml-1 text-gray-400">
                      {spec.order === "asc" ? "↑" : "↓"}
                      <sup className="ml-0.5 text-[10px] align-top">{idx + 1}</sup>
                    </span>
                  );
                })()}
              </th>
              <th
                className="px-4 py-3 cursor-pointer select-none"
                onClick={(e) => onHeaderClick(e, "locations")}
                title="Sort by location. Click: make primary/toggle. Shift+Click: add/toggle. Ctrl/Cmd: remove."
              >
                Location
                {(() => {
                  const idx = activeSorts.findIndex((s) => s.column === "locations");
                  if (idx === -1) return null;
                  const spec = activeSorts[idx];
                  return (
                    <span className="ml-1 text-gray-400">
                      {spec.order === "asc" ? "↑" : "↓"}
                      <sup className="ml-0.5 text-[10px] align-top">{idx + 1}</sup>
                    </span>
                  );
                })()}
              </th>
              <th
                className="px-4 py-3 cursor-pointer select-none whitespace-nowrap"
                onClick={(e) => onHeaderClick(e, "date_posted")}
                title="Sort by updated date. Click: make primary/toggle. Shift+Click: add/toggle. Ctrl/Cmd: remove."
              >
                Updated
                {(() => {
                  const idx = activeSorts.findIndex((s) => s.column === "date_posted");
                  if (idx === -1) return null;
                  const spec = activeSorts[idx];
                  return (
                    <span className="ml-1 text-gray-400">
                      {spec.order === "asc" ? "↑" : "↓"}
                      <sup className="ml-0.5 text-[10px] align-top">{idx + 1}</sup>
                    </span>
                  );
                })()}
              </th>
              <th className="px-4 py-3 text-center w-28">Apply</th>
              <th className="px-4 py-3 text-center">Hidden</th>
              <th
                className="px-4 py-3 text-center cursor-pointer select-none"
                onClick={(e) => onHeaderClick(e, "active")}
                title="Sort by active. Click: make primary/toggle. Shift+Click: add/toggle. Ctrl/Cmd: remove."
              >
                Active
                {(() => {
                  const idx = activeSorts.findIndex((s) => s.column === "active");
                  if (idx === -1) return null;
                  const spec = activeSorts[idx];
                  return (
                    <span className="ml-1 text-gray-400">
                      {spec.order === "asc" ? "↑" : "↓"}
                      <sup className="ml-0.5 text-[10px] align-top">{idx + 1}</sup>
                    </span>
                  );
                })()}
              </th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job.id} className="border-t border-default hover:bg-white/5">
                <td className="px-4 py-3 text-sm font-medium">{highlight(job.company_name, searchQuery)}</td>
                <td className="px-4 py-3 text-sm">{highlight(job.title, searchQuery)}</td>
                <td className="px-4 py-3 text-sm">{highlight(job.locations, searchQuery)}</td>
                <td className="px-4 py-3 text-sm whitespace-nowrap">{job.date_posted}</td>
                <td className="px-4 py-3 text-sm text-center">
                  {(() => {
                    const hasSimplify = (job.source || "").toLowerCase().includes("simplify");
                    const hasUrl = Boolean(job.url);
                    const simplifyUrl = `https://simplify.jobs/p/${job.id}`;
                    if (hasSimplify && hasUrl) {
                      return (
                        <div className="grid grid-cols-2 gap-0 rounded overflow-hidden border border-default">
                          <a
                            href={job.url!}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center justify-center h-8 w-full bg-blue-600 text-white text-xs hover:bg-blue-700"
                            title="Open original application link"
                          >
                            OG
                          </a>
                          <a
                            href={simplifyUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center justify-center h-8 w-full bg-indigo-600 text-white text-xs hover:bg-indigo-700"
                            title="Apply with Simplify"
                          >
                            <img src="/simplify-logo.png" alt="Simplify" className="h-4 w-4" />
                            <span className="sr-only">Simplify</span>
                          </a>
                        </div>
                      );
                    }
                    if (hasSimplify && !hasUrl) {
                      return (
                        <a
                          href={simplifyUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center justify-center h-8 px-3 rounded bg-indigo-600 text-white text-xs hover:bg-indigo-700"
                          title="Apply with Simplify"
                        >
                          Apply
                        </a>
                      );
                    }
                    if (hasUrl) {
                      return (
                        <a
                          href={job.url!}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center justify-center h-8 px-3 rounded bg-blue-600 text-white text-xs hover:bg-blue-700"
                          title="Open application link"
                        >
                          Apply
                        </a>
                      );
                    }
                    return <span className="text-xs text-muted">N/A</span>;
                  })()}
                </td>
                <td className="px-4 py-3 text-sm text-center">
                  <button
                    onClick={() => handleStatusToggle(job.id, "hidden")}
                    className={`px-2 py-1 text-xs rounded w-16 ${getApplicationStatus(job.id, "hidden") ? "bg-red-600 text-white" : "bg-gray-600 text-gray-200"}`}
                  >
                    {getApplicationStatus(job.id, "hidden") ? "Yes" : "No"}
                  </button>
                </td>
                <td className="px-4 py-3 text-sm text-center whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded ${job.active ? "bg-green-600" : "bg-gray-600"}`}>
                    {job.active ? "Active" : "Inactive"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile list */}
      <div className="lg:hidden space-y-3">
        {jobs.map((job) => (
          <div key={job.id} className="rounded-lg border border-default p-3 bg-gray-900/40">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="text-sm font-semibold truncate">{job.title}</div>
                <div className="text-xs text-muted truncate">{job.company_name}</div>
                <div className="text-xs text-muted truncate">{job.locations}</div>
              </div>
              <div className="shrink-0 text-right text-[11px] text-muted whitespace-nowrap">{job.date_posted}</div>
            </div>
            <div className="mt-3 flex items-center justify-between gap-2">
              <div className="w-32">
                {(() => {
                  const hasSimplify = (job.source || "").toLowerCase().includes("simplify");
                  const hasUrl = Boolean(job.url);
                  const simplifyUrl = `https://simplify.jobs/p/${job.id}`;
                  if (hasSimplify && hasUrl) {
                    return (
                      <div className="grid grid-cols-2 gap-0 rounded overflow-hidden border border-default">
                        <a
                          href={job.url!}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center justify-center h-8 w-full bg-blue-600 text-white text-xs hover:bg-blue-700"
                          title="Open original application link"
                        >
                          OG
                        </a>
                        <a
                          href={simplifyUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center justify-center h-8 w-full bg-indigo-600 text-white text-xs hover:bg-indigo-700"
                          title="Apply with Simplify"
                        >
                          <img src="/simplify-logo.png" alt="Simplify" className="h-4 w-4" />
                          <span className="sr-only">Simplify</span>
                        </a>
                      </div>
                    );
                  }
                  if (hasSimplify && !hasUrl) {
                    return (
                      <a
                        href={simplifyUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center h-8 w-full rounded bg-indigo-600 text-white text-xs hover:bg-indigo-700"
                        title="Apply with Simplify"
                      >
                        Apply
                      </a>
                    );
                  }
                  if (hasUrl) {
                    return (
                      <a
                        href={job.url!}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center h-8 w-full rounded bg-blue-600 text-white text-xs hover:bg-blue-700"
                        title="Open application link"
                      >
                        Apply
                      </a>
                    );
                  }
                  return <span className="text-xs text-muted">N/A</span>;
                })()}
              </div>
              <div className="flex items-center gap-2 ml-auto">
                <button
                  onClick={() => handleStatusToggle(job.id, "hidden")}
                  className={`px-2 py-1 text-xs rounded w-16 ${getApplicationStatus(job.id, "hidden") ? "bg-red-600 text-white" : "bg-gray-600 text-gray-200"}`}
                >
                  {getApplicationStatus(job.id, "hidden") ? "Hide" : "Show"}
                </button>
                <button
                  onClick={() => handleStatusToggle(job.id, "applied")}
                  className={`px-2 py-1 text-xs rounded w-20 ${getApplicationStatus(job.id, "applied") ? "bg-green-600 text-white" : "bg-gray-600 text-gray-200"}`}
                >
                  {getApplicationStatus(job.id, "applied") ? "Applied" : "Apply?"}
                </button>
                <span className={`px-2 py-1 text-xs rounded ${job.active ? "bg-green-600" : "bg-gray-600"}`}>
                  {job.active ? "Active" : "Inactive"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Pagination />
    </div>
  );
}



