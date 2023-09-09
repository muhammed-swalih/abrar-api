const mongoose = require("mongoose");


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

module.exports =  mongoose.model("ad", adSchema);
