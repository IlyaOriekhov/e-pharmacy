import { Schema, model } from "mongoose";
import {
  ACCESS_TOKEN_LIFETIME,
  REFRESH_TOKEN_LIFETIME,
} from "../../constants/user.js";

const sessionSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    accessToken: {
      type: String,
      required: true,
      unique: true,
    },
    refreshToken: {
      type: String,
      required: true,
      unique: true,
    },
    accessTokenValidUntil: {
      type: Date,
      required: true,
      default: () => new Date(Date.now() + ACCESS_TOKEN_LIFETIME),
    },
    refreshTokenValidUntil: {
      type: Date,
      required: true,
      default: () => new Date(Date.now() + REFRESH_TOKEN_LIFETIME),
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

sessionSchema.index({ refreshTokenValidUntil: 1 }, { expireAfterSeconds: 0 });

export const Session = model("Session", sessionSchema);
