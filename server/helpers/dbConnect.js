import mongoose from "mongoose";

const connectDatabase = async () => {
  const connect = await mongoose.connect(process.env.MONGODB_URI);
  console.log(`connected to ${connect.connection.host}`);
};

export default connectDatabase;
