import { NextResponse } from "next/server";
import Tender from "@/lib/db/models/tender";
import connectToDB from "@/lib/db/mongodb";

export async function POST(request: Request) {
  try {
    await connectToDB();
    
    const { title, description, department, submissionDeadline } = await request.json();
    
    const newTender = new Tender({
      title,
      description,
      department,
      submissionDeadline: new Date(submissionDeadline),
      status: "PENDING",
      totalBids: 0,
      createdBy: "evaluatorId" // TODO: Replace with actual evaluator ID from auth
    });

    await newTender.save();
    
    return NextResponse.json(newTender, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create tender" },
      { status: 500 }
    );
  }
}
