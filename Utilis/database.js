const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://newtarunsh:d35fBPlPcKSAowIm@namastenode.joiqp.mongodb.net/devTinder"
  );
};

module.exports = connectDB;
