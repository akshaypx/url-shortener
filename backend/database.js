import { mongoose } from "mongoose";
import { config } from "dotenv";

config();

const user = process.env.MONGO_USERNAME;
const password = process.env.MONGO_PASSWORD;
const uri = `mongodb+srv://${user}:${password}@cluster0.0t9zmus.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const connectToDb = () => {
  try {
    mongoose.connect(uri).then(() => console.log("Connected to db"));
  } catch (err) {
    console.log(err);
  }
};

export default connectToDb;
