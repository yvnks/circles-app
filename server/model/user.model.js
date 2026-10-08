import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: "Please enter your full name",
  },

  email: {
    type: String,
    trim: true,
    unique: "An account with this email address already exists",
    match: [/.+\@.+\..+/, "Please enter a valid email address"], // What char does this match?
    required: "Email is required",
  },

  created: {
    type: Date,
    default: Date.now,
  },
  updated: Date,

  password: {
    type: String,
    min: 6,
    required: "Please enter a password",
    select: false,
  },
});

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.authenticate = async function (plainText) {
  return await bcrypt.compare(plainText, this.password);
};

export default mongoose.model("UserSchema", UserSchema);
