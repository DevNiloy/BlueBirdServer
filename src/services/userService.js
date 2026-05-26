const Order = require("../models/Order");
const User = require("../models/User");

// User-er nijossho order list (My Orders)
// exports.getUserOrdersService = async (userId) => {
//   return await Order.find({ user: userId })
//     .sort({ createdAt: -1 }) // Latest order age
//     .populate("orderItems.product", "title images price"); // Product details shoho
// };
// User-er nijossho order list (My Orders)
exports.getUserOrdersService = async (userId) => {
  return await Order.find({ user: userId })
    .sort({ createdAt: -1 })
    .populate("orderItems.product", "name title images img price"); // আপনার প্রোডাক্ট মডেলে name/title বা img/images যা-ই থাকুক, ব্যাকআপ হিসেবে সিলেক্ট করে রাখা ভালো
};
// Admin-er jonno shob user-er list
exports.getAllUsersService = async () => {
  return await User.find()
    .select("-password") // Password chara data anbe
    .sort({ createdAt: -1 });
};
