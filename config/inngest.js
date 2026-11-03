// src/inngest/client.ts
import { Inngest } from "inngest";
import dbConnection from "./mongodb";
import User from "@/models/User";

export const inngest = new Inngest({ id: "swift_e-commerce" });

// Handle user creation to save the user to the database
export const syncUserCreated = inngest.createFunction(
  {
    id: "sync-clerk-user-created",
    triggers: { event: "clerk/user.created" },
  },
  async ({ event }) => {
    const {id, first_name, last_name, email_addresses, image_url } = event.data;

    const userData = {
      _id: id,
      email: email_addresses[0].email_address,
      name: first_name + " " + last_name,
      imageUrl: image_url,
    };

    await dbConnection(); // Esure the database connection is established
    await User.create(userData); // Save the user to the database
  }
);

// Sync updated Clerk user data into the MongoDB
export const syncUserUpdated = inngest.createFunction(
  {
    id: "sync-clerk-user-updated",
    triggers: { event: "clerk/user.updated" },
  },
  async ({ event }) => {
    const {id, first_name, last_name, email_addresses, image_url } = event.data;

    const userData = {
      _id: id,
      email: email_addresses[0].email_address,
      name: first_name + " " + last_name,
      imageUrl: image_url,
    };

    await dbConnection(); // Esure the database connection is established
    await User.findByIdAndUpdate(id, userData); // Update the user in the database
  }
);

// Sync user deletion from Clerk to MongoDB
export const syncUserDeleted = inngest.createFunction(
  {
    id: "sync-clerk-user-deleted",
    triggers: { event: "clerk/user.deleted" },
  },
  async ({ event }) => {
    const {id} = event.data;

    await dbConnection(); // Esure the database connection is established
    await User.findByIdAndDelete(id); // Delete the user from the database
  }
);

// Batch create orders using Inngest (Upgraded with Idempotency Protection)
export const createUserOrder = inngest.createFunction(
  {
    id: "create-user-order",
    batchEvents: {
      maxSize: 5, // Maximum of 5 events per batch
      timeout: "5s", // wait for 5 seconds before processing the batch
    }, 
    triggers: [{ event: "order/created" }],
  },

  async ({ events }) => {
    await dbConnection(); 

    // 1. Filter the batch so we ONLY look at COD orders
    const codOrders = events.filter(({ data }) => data.paymentType === "COD");

    // 2 Map them into a high-performance MongoDB bulk operational instruction array
    if (codOrders.length > 0) {
      const bulkOps = codOrders.map(({ data }) => ({
        updateOne: {
          // Identify uniqueness using a composite fingerprint: user ID + exact creation timestamp
          filter: {
            userId: data.userId,
            date: data.date
          },
          update: {
            $setOnInsert: {
              userId: data.userId,
              items: data.items,
              amount: data.amount,
              address: data.address,
              date: data.date || Date.now(),
              paymentType: data.paymentType,
              status: "Order Placed",
              isPaid: false,
            }
          },
          upsert: true, // Enables the database protection layer
        }
      }));

      // 3. Fire all operations to MongoDb simultaneously
      const result = await Order.bulkWrite(bulkOps);
      console.log(`📦 inngest safely synchronized ${codOrders.length} batch order(s) via bulkWrite. (Upserts: ${result.upsertedCount})`);
    } else {
      console.log("ℹ️ Inngest batch skipped: Stripe orders were already logged by the route handler.")
    }

    return { success: true, processed: codOrders.length };
  }
);