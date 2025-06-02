import mongoose from "mongoose";

const MONGODB_URI: string = process.env.MONGODB_URI || "";

if (!MONGODB_URI) {
  throw new Error(`Veuillez definir MONGODB_URI dans .env.local`);
}

export const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      console.log(`✅ déjà connecté à mongoDB`);
      return mongoose.connection;
    }

    await mongoose.connect(MONGODB_URI);
    console.log(`✅ Connexion reussie à mongoDB`);
    return mongoose.connection;
  } catch (error) {
    console.error("❌ erreur de la connexion à mongoDB : ", error);
    throw error;
  }
};
