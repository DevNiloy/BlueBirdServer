// const mongoose = require("mongoose");

// const orderSchema = new mongoose.Schema(
//   {
//     user: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
//     orderItems: [
//       {
//         name: { type: String, required: true },
//         qty: { type: Number, required: true },
//         image: { type: String, required: true },
//         price: { type: Number, required: true },
//         product: {
//           type: mongoose.Schema.Types.ObjectId,
//           ref: "Product",
//           required: true,
//         },
//       },
//     ],
//     name: { type: String },
//     shippingAddress: {
//       address: { type: String, required: true },
//       city: { type: String, required: true },
//       postalCode: { type: String, required: true },
//       phone: { type: String, required: true },
//     },
//     paymentMethod: { type: String, required: true, default: "COD" },
//     totalPrice: { type: Number, required: true },
//     status: {
//       type: String,
//       default: "Pending",
//       enum: ["Pending", "Confirmed", "Shipped", "Delivered", "Cancelled"],
//     },
//   },
//   { timestamps: true },
// );

// module.exports = mongoose.model("Order", orderSchema);

const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        // --- ভেরিয়েন্ট ট্র্যাক করার জন্য নতুন ফিল্ডসমূহ ---
        variantId: {
          type: String, // আপনার প্রোডাক্ট স্কিমায় ভেরিয়েন্টের আইডি যদি ওবজেক্টআইডি হয়, তবে mongoose.Schema.Types.ObjectId দিতে পারেন
          required: true,
        },
        unit: {
          type: String, // যেমন: 100ml, 500ml, 1kg ইত্যাদি ইনভয়েসে দেখানোর জন্য
          required: true,
        },
        // ------------------------------------------
      },
    ],
    name: { type: String },
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      phone: { type: String, required: true },
    },
    paymentMethod: { type: String, required: true, default: "COD" },
    totalPrice: { type: Number, required: true },
    status: {
      type: String,
      default: "Pending",
      enum: ["Pending", "Confirmed", "Shipped", "Delivered", "Cancelled"],
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Order", orderSchema);
