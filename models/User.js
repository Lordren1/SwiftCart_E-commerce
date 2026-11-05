import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

  _id: {type: String, required: true},
  email: {type: String, required: true, unique: true, index: true },

   // Name path string to accept incoming webhook
   name: { type: String, required: true, default: "SwiftCart Shopper" },


  // Changed to required: false so standard email registrations never fail
  imageUrl: {type: String, required: false, default: ""},

  // Configured for multidimensional { itemId: { size: quantity } } cart structure
  cartItems: {type: Object, default: {}},
}, 
  {minimize: false, timestamps: true } // timestamps handles createdAt / updatedAt data auditing natively
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;