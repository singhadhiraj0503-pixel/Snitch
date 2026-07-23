import mongoose, { model } from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    price: {
      amount: { type: Number, required: true },
      currency: {
        type: String,
        enum: ["USD", "EUR", "GBP", "YEN", "INR"],
        default: "INR",
      },
    },
    images: [
      {
        url: { type: String, required: true },
        // alt: { type: String, required: true },
      },
    ],
  },
  { timestamps: true },
);

const productModel = new mongoose.model("product", productSchema);

export default productModel;
