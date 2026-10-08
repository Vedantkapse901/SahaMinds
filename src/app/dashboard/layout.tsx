"use client";

import {
  LayoutGrid,
  CalendarClock,
  Search,
  MessageSquare,
  CreditCard,
  UserCircle,
  ShieldCheck,
} from "lucide-react";
import { DashboardShell, SidebarNavItem } from "@/components/layout/dashboard-shell";

const NAV: SidebarNavItem[] = [
  { href: "/dashboard", label: "Overview", icon: LayoutGrid },
  { href: "/dashboard/appointments", label: "Appointments", icon: CalendarClock },
  { href: "/psychologists", label: "Find a Psychologist", icon: Search },
  { href: "/dashboard/messages", label: "Messages", icon: MessageSquare },
  { href: "/dashboard/payments", label: "Payments", icon: CreditCard },
  { href: "/dashboard/profile", label: "Profile", icon: UserCircle },
  { href: "/dashboard/privacy", label: "Privacy & Security", icon: ShieldCheck },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardShell navItems={NAV} brandLabel="Client Workspace" exitHref="/">
      {children}
    </DashboardShell>
  );
}
