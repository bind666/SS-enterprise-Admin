import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String },
    price: { type: Number, required: true },
    image: { type: String, required: true }, // Cloudinary URL
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
