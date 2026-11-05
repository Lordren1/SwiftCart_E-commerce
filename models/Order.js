import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    // Using explicit ObjectId references for proper database collection populates
    UserId: {
      type: String,
      required: true,
      ref: "User"
    },

    // Embedded deep document model map block to match frontend loop properties
    items: [
      {
        product: {
          _id: { type: String, required: true },
          name: { type: String, required: true },
          category: { type: String, required: true },
          subCategory: { type: String, required: true },
          price: { type: Number, required: true },
          offerPrice: { type: Number, required: true },
          images: [{ type: String, required: true }]
        },
        quantity: { type: Number, required: true },
        size: { type: String, required: true }
      }
    ],

    amount: { type: Number, required: true },

    address: {
      completeName: { type: String, required: true },
      phone: { type: String, required: true },
      zipcode: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      country: { type: String, required: true },
      streetAddress: { type: String, required: true}
    },

     status: { type: String, required: true, default: "Order Placed" },
      paymentType: { type: String, required: true }, // e.g., "COD" or "Stripe"
      isPaid: { type: Boolean, required: true, default: false },
      date: { type: Number, default: Date.now }
  },
  { minimize: false, timestamps: true }
);

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;