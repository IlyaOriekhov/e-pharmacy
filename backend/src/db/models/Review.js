import { Schema, model } from "mongoose";

const reviewSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Reviewer name is required"],
      trim: true,
    },
    testimonial: {
      type: String,
      required: [true, "Testimonial is required"],
      maxlength: [1000, "Testimonial cannot exceed 1000 characters"],
    },
    rating: {
      type: Number,
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating cannot exceed 5"],
      default: 5,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Review = model("Review", reviewSchema);
