import mongoose from "mongoose";

const { Schema } = mongoose;

const packageSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  special: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  days: {
    type: String,
    require: true,
  },
  pic: {
    data: Buffer,
    contentType: String,
  },
  description: {
    type: String,
    required: true,
  },
  picUrl: {
    type: String,
  },
});

export default mongoose.model("package", packageSchema);
