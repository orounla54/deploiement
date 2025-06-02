import { IDessert } from "@/interface/dessert";
import { connectDB } from "@/lib/mongoose";
import { Dessert } from "@/models/Dessert";
import Order from "@/models/Order";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const desserts: IDessert[] = await Dessert.find();
    return NextResponse.json({ desserts }, { status: 200 });
  } catch (error: any) {
    console.log(`Erreur API : ${error}`);
    return NextResponse.json(
      { error: "Erreur interne du serveur", details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    // Si le body contient un champ 'name', c'est un dessert
    if (body.name) {
      const dessert = await Dessert.create(body);
      return NextResponse.json({ dessert }, { status: 201 });
    }
    
    // Sinon, c'est une commande
    if (body.dessert && body.total) {
      const order = await Order.create(body);
      return NextResponse.json({ order }, { status: 201 });
    }

    return NextResponse.json(
      { error: "Format de données invalide" },
      { status: 400 }
    );
  } catch (error: any) {
    console.log(`Erreur API : ${error}`);
    return NextResponse.json(
      { error: "Erreur interne du serveur", details: error.message },
      { status: 500 }
    );
  }
}
