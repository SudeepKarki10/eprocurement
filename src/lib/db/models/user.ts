// src/lib/db/models/user.ts

import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
    },
    role: {
      type: String,
      enum: ["ADMIN", "VENDOR", "EVALUATOR"],
      default: "VENDOR",
    },
    companyName: {
      type: String,
      required: function (this: any) {
        return this.role === "VENDOR";
      },
    },
    registrationNumber: {
      type: String,
      required: function (this: any) {
        return this.role === "VENDOR";
      },
    },
    verificationStatus: {
      type: Boolean,
      default: false,
    },
    documents: [
      {
        type: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
        verificationStatus: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
