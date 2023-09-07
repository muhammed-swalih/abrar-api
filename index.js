import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import packageRoutes from "./routes/packageRoutes.js";
import adRoutes from './routes/adRouter.js'
import cors from "cors";

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));
app.use("/packages", packageRoutes);
app.use("/ads",adRoutes)

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("mongodb is connected");
  } catch (error) {
    console.log(error);
  }
};

mongoose.connection.on("connected", () => {
  console.log("connected to the mongodb");
});

mongoose.connection.on("disconnection", () => {
  console.log("disconnected from the mongodb");
});

app.listen(5001, () => {
  console.log("server is running at port 5000");
  connect();
});
