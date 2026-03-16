import { createContext, useContext, useState, ReactNode } from "react";

export type AppRole = "admin" | "user-apn" | "user-ph" | "user-tax";

interface RoleContextValue {
  role: AppRole;
  setRole: (role: AppRole) => void;
}

const RoleContext = createContext<RoleContextValue | undefined>(undefined);

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<AppRole>("admin");
  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const ctx = useContext(RoleContext);
  if (!ctx) throw new Error("useRole must be used within RoleProvider");
  return ctx;
}

export const ROLE_LABELS: Record<AppRole, string> = {
  admin: "Admin",
  "user-apn": "APN User",
  "user-ph": "PH User",
  "user-tax": "Tax User",
};

export const ROLE_INITIALS: Record<AppRole, string> = {
  admin: "A",
  "user-apn": "U",
  "user-ph": "U",
  "user-tax": "T",
};
