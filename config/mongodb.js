
import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error("Please define MONGO_URI in your environment variables.");
}

let dbCache = global.mongoose;

if (!dbCache) {
  dbCache = global.mongoose = {
    conn: null,
    promise: null,
  };
}

export default async function dbConnection() {
  // Return existing connection
  if (dbCache.conn) {
    return dbCache.conn;
  }

  // Establish a new connection if one doesn't exist
  if (!dbCache.promise) {
    const options = {
      dbName: "swiftcart",
      bufferCommands: false,
    };

    dbCache.promise = mongoose.connect(MONGO_URI, options);
  }

  try {
    dbCache.conn = await dbCache.promise;

    console.log("MongoDB connected successfully");

    return dbCache.conn;
  } catch (error) {
    dbCache.promise = null;
    console.error("MongoDB connection error:", error);
    throw error;
  }
}
