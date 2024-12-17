import { mongoose, Schema } from "mongoose";

const schema = new Schema(
  {
    url: { type: String, required: true },
    shortCode: { type: String, required: true },
    numberOfClicks: { type: Number },
  },
  {
    timestamps: true,
  }
);
const Url = mongoose.model("Url", schema);
export default Url;
