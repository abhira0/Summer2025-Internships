"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

type ApplicationsShape = {
  applications: Record<string, { applied?: string[]; hidden?: string[] }>;
};

type ApplicationsContextValue = {
  applications: ApplicationsShape;
  getApplicationStatus: (jobId: string, type: "applied" | "hidden") => boolean;
  updateApplication: (jobId: string, type: "applied" | "hidden", value: boolean) => Promise<void>;
  username: string | null;
  setUsername: (u: string | null) => void;
};

const ApplicationsContext = createContext<ApplicationsContextValue | null>(null);

export function useApplications() {
  const ctx = useContext(ApplicationsContext);
  if (!ctx) throw new Error("useApplications must be used within ApplicationsProvider");
  return ctx;
}

export function ApplicationsProvider({ children }: { children: React.ReactNode }) {
  const [applications, setApplications] = useState<ApplicationsShape>({ applications: {} });
  const [username, setUsername] = useState<string | null>(null);

  const getApplicationStatus = useCallback(
    (jobId: string, type: "applied" | "hidden") => {
      if (!username) return false;
      const userApps = applications.applications[username];
      if (!userApps) return false;
      const list = userApps[type] ?? [];
      return list.includes(jobId);
    },
    [applications, username]
  );

  const updateApplication = useCallback(
    async (jobId: string, type: "applied" | "hidden", value: boolean) => {
      if (!username) return;
      setApplications((prev) => {
        const userApps = prev.applications[username!] ?? {};
        const list = new Set<string>(userApps[type] ?? []);
        if (value) list.add(jobId);
        else list.delete(jobId);
        const next: ApplicationsShape = {
          applications: {
            ...prev.applications,
            [username!]: {
              ...userApps,
              [type]: Array.from(list),
            },
          },
        };
        return next;
      });
    },
    [username]
  );

  const value = useMemo<ApplicationsContextValue>(
    () => ({ applications, getApplicationStatus, updateApplication, username, setUsername }),
    [applications, getApplicationStatus, updateApplication, username]
  );

  return <ApplicationsContext.Provider value={value}>{children}</ApplicationsContext.Provider>;
}



