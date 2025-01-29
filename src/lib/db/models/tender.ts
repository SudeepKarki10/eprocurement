import mongoose from "mongoose";

const TenderSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  department: { type: String, required: true },
  submissionDeadline: { type: Date, required: true },
  status: {
    type: String,
    enum: ["PENDING", "IN_EVALUATION", "EVALUATED"],
    default: "PENDING",
  },
  totalBids: { type: Number, default: 0 },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Tender || mongoose.model("Tender", TenderSchema);
