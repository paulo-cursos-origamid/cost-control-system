"use client";

import { ReactNode, useEffect } from "react";

import { useRouter } from "next/navigation";

import { DashboardShell } from "@/components/layout/dashboard-shell/dashboard-shell";

import { useAuth } from "@/modules/auth/hooks/use-auth";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter();

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);



  if (!isAuthenticated) {
    return null;
  }

  return (
    <ProtectedRoute>
      <DashboardShell>{children}</DashboardShell>
    </ProtectedRoute>
  );
}
