import type { Metadata } from "next";
import { DemoProvider } from "@/components/dashboard/DemoProvider";
import { DashboardShell } from "@/components/dashboard/Shell";

export const metadata: Metadata = { title: { default: "Dashboard (demo)", template: "%s · Dashboard (demo)" }, robots: { index: false } };

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <DemoProvider>
      <DashboardShell>
        <main id="main">{children}</main>
      </DashboardShell>
    </DemoProvider>
  );
}
