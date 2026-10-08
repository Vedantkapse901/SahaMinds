"use client";

import {
  LayoutGrid,
  CalendarRange,
  CalendarClock,
  Users,
  MessageSquare,
  Wallet,
  UserCircle,
  Clock,
} from "lucide-react";
import { DashboardShell, SidebarNavItem } from "@/components/layout/dashboard-shell";

const NAV: SidebarNavItem[] = [
  { href: "/psychologist/dashboard", label: "Overview", icon: LayoutGrid },
  { href: "/psychologist/calendar", label: "Calendar", icon: CalendarRange },
  { href: "/psychologist/appointments", label: "Appointments", icon: CalendarClock },
  { href: "/psychologist/clients", label: "Clients", icon: Users },
  { href: "/psychologist/messages", label: "Messages", icon: MessageSquare },
  { href: "/psychologist/earnings", label: "Earnings", icon: Wallet },
  { href: "/psychologist/profile", label: "Profile", icon: UserCircle },
  { href: "/psychologist/availability", label: "Availability", icon: Clock },
];

export default function PsychologistAppLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardShell navItems={NAV} brandLabel="Practice Workspace" exitHref="/">
      {children}
    </DashboardShell>
  );
}
