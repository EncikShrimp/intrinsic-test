import mongoose from "mongoose";

export type TUser = {
  email: string;
  password: string;
  name: string;
};

const userSchema = new mongoose.Schema<TUser>(
  {
    email: {
      type: String,
      required: false,
      unique: true,
    },
    password: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const User =
  (mongoose.models.User as mongoose.Model<TUser>) ||
  mongoose.model("User", userSchema);

export default User;
