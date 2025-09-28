import { ReactNode } from "react";
import { ClerkProvider as ClerkProviderBase } from "@clerk/nextjs";

export function ClerkProvider({ children }: { children: ReactNode }) {
  return <ClerkProviderBase>{children}</ClerkProviderBase>;
}
