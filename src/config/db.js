import mongoose from "mongoose";
import chalk from "chalk";
const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    await mongoose
      .connect(uri)
      .catch((error) => console.log(error))
      .then(() => {
        console.log(chalk.bgMagentaBright("MONGODB CONNECTED SUCCESSFULLY!"));
      });
  } catch (error) {
    console.log(error);
    return error;
  }
};

export default connectDB;
