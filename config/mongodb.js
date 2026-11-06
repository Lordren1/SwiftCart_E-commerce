
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
      bufferCommands: false, // Prevent mongoose from buffering operations
    };

    dbCache.promise = mongoose.connect(MONGO_URI, options).then((mongoose) => {
      console.log("✔ MongoDB connected successfully");
      return mongoose;
    }).catch((error) => {
      console.error("❌ MongoDB connection error:", error);
      throw error;
    });
  }

  // Await the promise and cache the connection object
  dbCache.conn = await dbCache.promise;
  return dbCache.conn;

  /* try {
    dbCache.conn = await dbCache.promise;

    console.log("MongoDB connected successfully");

    return dbCache.conn;
  } catch (error) {
    dbCache.promise = null;
    console.error("MongoDB connection error:", error);
    throw error;
  } */

  
}
