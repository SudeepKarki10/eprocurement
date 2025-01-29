// src/components/forms/BidEvaluationForm.tsx
"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";

interface EvaluationCriteria {
  id: string;
  name: string;
  weight: number;
  score: number;
  maxScore: number;
}

export default function BidEvaluationForm() {
  const [criteria, setCriteria] = useState<EvaluationCriteria[]>([
    {
      id: "1",
      name: "Technical Capability",
      weight: 30,
      score: 0,
      maxScore: 10,
    },
    {
      id: "2",
      name: "Previous Experience",
      weight: 25,
      score: 0,
      maxScore: 10,
    },
    {
      id: "3",
      name: "Financial Stability",
      weight: 20,
      score: 0,
      maxScore: 10,
    },
    {
      id: "4",
      name: "Methodology",
      weight: 15,
      score: 0,
      maxScore: 10,
    },
    {
      id: "5",
      name: "Timeline",
      weight: 10,
      score: 0,
      maxScore: 10,
    },
  ]);

  const [comments, setComments] = useState("");

  const handleScoreChange = (id: string, score: number) => {
    setCriteria(
      criteria.map((criterion) =>
        criterion.id === id
          ? { ...criterion, score: Math.min(score, criterion.maxScore) }
          : criterion
      )
    );
  };

  const calculateTotalScore = () => {
    return criteria
      .reduce((total, criterion) => {
        return (
          total + (criterion.score * criterion.weight) / criterion.maxScore
        );
      }, 0)
      .toFixed(2);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle submission logic here
    console.log({
      criteria,
      comments,
      totalScore: calculateTotalScore(),
    });
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Bid Evaluation Form</h2>

      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          {criteria.map((criterion) => (
            <div key={criterion.id} className="border-b pb-4">
              <div className="flex justify-between items-center mb-2">
                <label className="font-medium">
                  {criterion.name} (Weight: {criterion.weight}%)
                </label>
                <span className="text-sm text-gray-600">
                  Score: {criterion.score}/{criterion.maxScore}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max={criterion.maxScore}
                value={criterion.score}
                onChange={(e) =>
                  handleScoreChange(criterion.id, Number(e.target.value))
                }
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-600">
                <span>Poor</span>
                <span>Excellent</span>
              </div>
            </div>
          ))}

          <div className="mt-6">
            <label className="block font-medium mb-2">
              Evaluation Comments
            </label>
            <textarea
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              className="w-full h-32 p-2 border rounded-md"
              placeholder="Enter your evaluation comments..."
            />
          </div>

          <div className="mt-6 flex justify-between items-center">
            <div className="text-lg font-semibold">
              Total Score: {calculateTotalScore()}%
            </div>
            <div className="space-x-4">
              <button
                type="button"
                className="px-4 py-2 border rounded-md hover:bg-gray-50"
              >
                Save Draft
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Submit Evaluation
              </button>
            </div>
          </div>
        </div>
      </form>
    </Card>
  );
}
