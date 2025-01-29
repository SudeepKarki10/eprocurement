// src/app/dashboard/page.tsx
"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import DashboardLayout from "@/components/Layout/Dashboard/DashboardLayout";
import { Card as CardComponent } from "@/components/ui/card";
import { FC } from "react";

const Card: FC<{ className?: string; children: React.ReactNode }> =
  CardComponent;

export default function Dashboard() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/auth/signin");
    },
  });

  const role = session?.user?.role;

  return (
    <DashboardLayout>
      {role === "ADMIN" && <AdminDashboard />}
      {role === "VENDOR" && <VendorDashboard />}
      {role === "EVALUATOR" && <EvaluatorDashboard />}
    </DashboardLayout>
  );
}

function AdminDashboard() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card className="p-6">
        <h3 className="text-lg font-semibold">Active Tenders</h3>
        <p className="text-3xl font-bold mt-2">12</p>
      </Card>
      <Card className="p-6">
        <h3 className="text-lg font-semibold">Registered Vendors</h3>
        <p className="text-3xl font-bold mt-2">45</p>
      </Card>
      <Card className="p-6">
        <h3 className="text-lg font-semibold">Total Bids</h3>
        <p className="text-3xl font-bold mt-2">89</p>
      </Card>
      {/* Add more stats and quick actions as needed */}
    </div>
  );
}

function VendorDashboard() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card className="p-6">
        <h3 className="text-lg font-semibold">My Active Bids</h3>
        <p className="text-3xl font-bold mt-2">5</p>
      </Card>
      <Card className="p-6">
        <h3 className="text-lg font-semibold">Available Tenders</h3>
        <p className="text-3xl font-bold mt-2">8</p>
      </Card>
      <Card className="p-6">
        <h3 className="text-lg font-semibold">Won Contracts</h3>
        <p className="text-3xl font-bold mt-2">3</p>
      </Card>
      {/* Add more vendor-specific stats */}
    </div>
  );
}

function EvaluatorDashboard() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card className="p-6">
        <h3 className="text-lg font-semibold">Pending Evaluations</h3>
        <p className="text-3xl font-bold mt-2">7</p>
      </Card>
      <Card className="p-6">
        <h3 className="text-lg font-semibold">Completed Evaluations</h3>
        <p className="text-3xl font-bold mt-2">15</p>
      </Card>
      <Card className="p-6">
        <h3 className="text-lg font-semibold">Active Tenders</h3>
        <p className="text-3xl font-bold mt-2">4</p>
      </Card>
      {/* Add more evaluator-specific stats */}
    </div>
  );
}
