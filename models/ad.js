import mongoose from "mongoose";

const { Schema } = mongoose;

const adSchema = new Schema({
  pic: {
    data: Buffer,
    contentType: String,
  },
  picUrl: {
    type: String,
  },
});

export default mongoose.model("ad", adSchema);
