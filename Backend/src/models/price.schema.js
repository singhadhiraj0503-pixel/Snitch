import mongoose from "mongoose";

const priceSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      enum: ["USD", "EUR", "GBP", "JYP", "INR"],
      default: "INR",
    },
  },
  { _id: false, _v: false }, // does not store the _id and version for this schema if the value is false.
);

export default priceSchema;
