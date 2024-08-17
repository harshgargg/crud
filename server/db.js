const mongoose = require('mongoose')
const mongoURI = "mongodb+srv://harshgarg3107:ZlmCrU7rSsPeVAp1@cluster0.sxjwzff.mongodb.net/CRUD";

const connectToMongo = async () => {
  try {
    mongoose.set("strictQuery", false);
    mongoose.connect(mongoURI);
    console.log("Connected to Mongo Successfully!");
  } catch (error) {
    console.log(error);
  }
};
module.exports = connectToMongo;