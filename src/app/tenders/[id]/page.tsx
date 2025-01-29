// src/app/tenders/[id]/page.tsx
"use client";

import { useState } from "react";
import DashboardLayout from "@/components/Layout/Dashboard/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Bid {
  id: string;
  vendorName: string;
  technicalScore: number;
  financialScore: number;
  totalAmount: number;
  documents: { name: string; url: string }[];
}

export default function TenderEvaluation({
  params,
}: {
  params: { id: string };
}) {
  const [bids, setBids] = useState<Bid[]>([
    {
      id: "1",
      vendorName: "Tech Solutions Ltd",
      technicalScore: 85,
      financialScore: 90,
      totalAmount: 150000,
      documents: [
        { name: "Technical Proposal", url: "#" },
        { name: "Financial Proposal", url: "#" },
      ],
    },
    // Add more sample bids
  ]);

  const [selectedBid, setSelectedBid] = useState<Bid | null>(null);

  const handleScoreUpdate = (
    bidId: string,
    type: "technical" | "financial",
    value: number
  ) => {
    setBids(
      bids.map((bid) =>
        bid.id === bidId ? { ...bid, [`${type}Score`]: value } : bid
      )
    );
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Tender Evaluation</h1>
          <Button variant="outline">Export Evaluation Report</Button>
        </div>

        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="technical">Technical Evaluation</TabsTrigger>
            <TabsTrigger value="financial">Financial Evaluation</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Tender Details</h2>
              {/* Add tender details here */}
            </Card>
          </TabsContent>

          <TabsContent value="technical">
            <Card className="p-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Vendor</TableHead>
                    <TableHead>Technical Score</TableHead>
                    <TableHead>Documents</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bids.map((bid) => (
                    <TableRow key={bid.id}>
                      <TableCell>{bid.vendorName}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-4">
                          <Slider
                            value={bid.technicalScore}
                            onChange={(value: number) =>
                              handleScoreUpdate(bid.id, "technical", value)
                            }
                            max={100}
                            step={1}
                            className="w-[200px]"
                          />
                          <span>{bid.technicalScore}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {bid.documents.map((doc) => (
                          <a
                            key={doc.name}
                            href={doc.url}
                            className="text-blue-600 hover:underline block"
                          >
                            {doc.name}
                          </a>
                        ))}
                      </TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              onClick={() => setSelectedBid(bid)}
                            >
                              Add Notes
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Evaluation Notes</DialogTitle>
                            </DialogHeader>
                            {/* Add evaluation notes form */}
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          <TabsContent value="financial">
            <Card className="p-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Vendor</TableHead>
                    <TableHead>Total Amount</TableHead>
                    <TableHead>Financial Score</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bids.map((bid) => (
                    <TableRow key={bid.id}>
                      <TableCell>{bid.vendorName}</TableCell>
                      <TableCell>${bid.totalAmount.toLocaleString()}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-4">
                          <Slider
                            value={bid.financialScore}
                            onChange={(value: number) =>
                              handleScoreUpdate(bid.id, "financial", value)
                            }
                            max={100}
                            step={1}
                            className="w-[200px]"
                          />
                          <span>{bid.financialScore}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline">View Details</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
