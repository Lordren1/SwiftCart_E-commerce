
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import dbConnection from "@/config/mongodb";


export async function GET() {
  try {
    await dbConnection();

    return NextResponse.json({
      success: true,
      message: "MongoDB connected successfully!",
      database: mongoose.connection.name,
      readyState: mongoose.connection.readyState,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "MongoDB connection failed",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
