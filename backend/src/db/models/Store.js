import { Schema, model } from "mongoose";

const pharmacySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Pharmacy name is required"],
      trim: true,
    },
    address: {
      type: String,
      required: [true, "Address is required"],
      trim: true,
    },
    city: {
      type: String,
      required: [true, "City is required"],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    rating: {
      type: Number,
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating cannot exceed 5"],
      default: 1,
    },
    status: {
      type: String,
      enum: ["OPEN", "CLOSE"],
      default: "OPEN",
    },
    isNearest: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

pharmacySchema.index({ city: 1 });
pharmacySchema.index({ rating: -1 });
pharmacySchema.index({ isNearest: 1 });

export const Pharmacy = model("Pharmacy", pharmacySchema);

const nearestPharmacySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Pharmacy name is required"],
      trim: true,
    },
    address: {
      type: String,
      required: [true, "Address is required"],
      trim: true,
    },
    city: {
      type: String,
      required: [true, "City is required"],
      trim: true,
      default: "Kyiv",
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    rating: {
      type: Number,
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating cannot exceed 5"],
      default: 1,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const NearestPharmacy = model("NearestPharmacy", nearestPharmacySchema);
