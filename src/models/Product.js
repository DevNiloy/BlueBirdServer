const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    desc: {
      type: String,
      required: true,
    },

    // মডিফাইড অংশ: মাল্টিপল ভেরিয়েন্টের জন্য অ্যারে লজিক
    variants: [
      {
        unit: { type: String, required: true }, // যেমন: 100ml, 500ml, 1ltr
        price: { type: Number, required: true },
        discountPrice: { type: Number, default: 0 },
        stockQuantity: { type: Number, default: 0 },
        stockStatus: {
          type: String,
          enum: ["available", "out of stock"],
          default: "available",
        },
      },
    ],

    images: [String], // VPS storage path array

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
    },

    bestSeller: {
      type: Boolean,
      default: false,
    },
    purchaseCount: {
      type: Number,
      default: 0,
    },

    // Ratings logic
    ratings: {
      average: { type: Number, default: 0 },
      count: { type: Number, default: 0 },
    },

    reviews: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        name: String,
        rating: Number,
        comment: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true },
);

// Title থেকে অটোমেটিক slug জেনারেট করার লজিক
productSchema.pre("validate", function () {
  if (this.title && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .trim()
      .replace(/[^\w ]+/g, "")
      .replace(/ +/g, "-");
  }
});

module.exports = mongoose.model("Product", productSchema);
