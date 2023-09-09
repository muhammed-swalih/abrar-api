const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const packageRoutes = require('./routes/packageRoutes.js');
const adRoutes = require('./routes/adRouter.js');
const cors = require('cors');

// Rest of your code...


dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));
app.use('/images', express.static('images'));
app.use("/packages", packageRoutes);
app.use("/ads", adRoutes);


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
