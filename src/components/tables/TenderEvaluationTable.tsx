// src/components/tables/TenderEvaluationTable.tsx
"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { ChevronDown, ChevronUp, Search, Filter, Check, X } from "lucide-react";

interface Tender {
  id: string;
  title: string;
  department: string;
  submissionDate: string;
  status: string;
  bidCount: number;
}

export default function TenderEvaluationTable() {
  const [tenders, setTenders] = useState<Tender[]>([
    {
      id: "1",
      title: "IT Infrastructure Upgrade",
      department: "Technology",
      submissionDate: "2025-02-15",
      status: "Under Evaluation",
      bidCount: 5,
    },
    // Add more sample data as needed
  ]);

  const [expandedTenderId, setExpandedTenderId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const handleExpandTender = (tenderId: string) => {
    setExpandedTenderId(expandedTenderId === tenderId ? null : tenderId);
  };

  const filteredTenders = tenders.filter((tender) => {
    const matchesSearch =
      tender.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tender.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || tender.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4 mb-4">
        <div className="flex-1 min-w-[200px]">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search tenders..."
              className="w-full pl-10 pr-4 py-2 border rounded-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Filter size={20} className="text-gray-400" />
          <select
            className="border rounded-md px-3 py-2"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="Under Evaluation">Under Evaluation</option>
            <option value="Evaluated">Evaluated</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {filteredTenders.map((tender) => (
          <Card key={tender.id} className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">{tender.title}</h3>
                <p className="text-sm text-gray-600">
                  Department: {tender.department}
                </p>
                <p className="text-sm text-gray-600">
                  Submission Date: {tender.submissionDate}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    tender.status === "Under Evaluation"
                      ? "bg-yellow-100 text-yellow-800"
                      : tender.status === "Evaluated"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {tender.status}
                </span>
                <button
                  onClick={() => handleExpandTender(tender.id)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  {expandedTenderId === tender.id ? (
                    <ChevronUp />
                  ) : (
                    <ChevronDown />
                  )}
                </button>
              </div>
            </div>

            {expandedTenderId === tender.id && (
              <div className="mt-4 border-t pt-4">
                <h4 className="font-semibold mb-2">Bids ({tender.bidCount})</h4>
                <div className="space-y-2">
                  {/* Sample bid items - replace with actual bid data */}
                  <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <div>
                      <p className="font-medium">Vendor Company A</p>
                      <p className="text-sm text-gray-600">
                        Bid Amount: $50,000
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 text-green-600 hover:bg-green-50 rounded">
                        <Check size={20} />
                      </button>
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded">
                        <X size={20} />
                      </button>
                    </div>
                  </div>
                  {/* Add more bid items here */}
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
