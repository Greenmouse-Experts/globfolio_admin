"use client";

import DashboardLayout from "./DashboardLayout";
import NoLayout from "./NoLayout";


export const Layouts = {
  Login: NoLayout,
  Dashboard: DashboardLayout,
};

export type LayoutKeys = keyof typeof Layouts;