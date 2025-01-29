// src/app/tenders/page.tsx
"use client";

import { useState } from "react";
import DashboardLayout from "@/components/Layout/Dashboard/DashboardLayout";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

// Sample data type
interface Tender {
  id: string;
  title: string;
  department: string;
  submissionDeadline: string;
  status: "PENDING" | "IN_EVALUATION" | "EVALUATED";
  totalBids: number;
}

export default function EvaluatorTenders() {
  const router = useRouter();
  // Sample data - replace with API call
  const [tenders] = useState<Tender[]>([
    {
      id: "1",
      title: "IT Infrastructure Upgrade",
      department: "Information Technology",
      submissionDeadline: "2024-02-15",
      status: "PENDING",
      totalBids: 5,
    },
    {
      id: "2",
      title: "Office Supplies Contract",
      department: "Administration",
      submissionDeadline: "2024-02-20",
      status: "IN_EVALUATION",
      totalBids: 3,
    },
  ]);

  const getStatusBadge = (status: string) => {
    const colors = {
      PENDING: "bg-yellow-100 text-yellow-800",
      IN_EVALUATION: "bg-blue-100 text-blue-800",
      EVALUATED: "bg-green-100 text-green-800",
    };
    return (
      <Badge className={colors[status as keyof typeof colors]}>{status}</Badge>
    );
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Tender Evaluation Dashboard</h1>
        </div>

        <Card className="p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tender Title</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Submission Deadline</TableHead>
                <TableHead>Total Bids</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tenders.map((tender) => (
                <TableRow key={tender.id}>
                  <TableCell className="font-medium">{tender.title}</TableCell>
                  <TableCell>{tender.department}</TableCell>
                  <TableCell>{tender.submissionDeadline}</TableCell>
                  <TableCell>{tender.totalBids}</TableCell>
                  <TableCell>{getStatusBadge(tender.status)}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => router.push(`/tenders/${tender.id}`)}
                      variant="outline"
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </DashboardLayout>
  );
}
