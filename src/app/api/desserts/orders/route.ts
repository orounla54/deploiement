import { connectDB } from "@/lib/mongoose";
import Order from "@/models/Order";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const orders = await Order.find().populate("dessert.dessert");
    return NextResponse.json({ orders }, { status: 200 });
  } catch (error: any) {
    console.log(`Erreur API : ${error}`);
    return NextResponse.json(
      { error: "Erreur interne du serveur", details: error.message },
      { status: 500 }
    );
  }
}
