const mongoose = require("mongoose");

// Function to connect to MongoDB database
const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
};

module.exports = connectDB;
