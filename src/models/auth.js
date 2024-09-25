import mongoose from "mongoose";
import { userGlobalCountModel } from "./userGlobalCounts.js";

const authSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true, unique: true },
    pin: { type: String, required: true },
  },

  { timestamps: true }
);


authSchema.post('save', async function(doc) {
  try {
    const newGlobalDataCount = await userGlobalCountModel.create({ userId: doc._id });
    newGlobalDataCount.save();
    console.log("New Global Data Count:", newGlobalDataCount);
  } catch (error) {
    console.error("Error creating global data count:", error);
  }
});

authSchema.post('remove', async function(doc) {
  const userId = doc._id;
  try {
    const deleteGlobalDataCount = await userGlobalCountModel.findOneAndDelete({ userId });
    console.log("Deleted Global Data Count:", deleteGlobalDataCount);
  } catch (error) {
    console.error("Error deleting global data count:", error);
  }
});


export default mongoose.model("Auth", authSchema, "auth");