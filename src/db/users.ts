import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  authentication: {
    // select set to false so it's not selected by default
    password: { type: String, required: true, select: false },
    salt: { type: String, select: false }, // password protection
    sessionToken: { type: String, select: false }
  }
});

const UserModel = mongoose.model("User", UserSchema);

const getUsers = () => UserModel.find();
const getUserByEmail = (email: String) => UserModel.findOne({ email });
const getUserBySessionToken = (sessionToken: string) =>
  UserModel.find({ "authentication.sessionToken": sessionToken });

const getUserById = (id: String) => UserModel.findById(id);
const createUser = (values: Record<string, any>) =>
  new UserModel(values).save().then((user) => user.toObject());
const deleteUserById = (id: String) => UserModel.findOneAndDelete({ _id: id });
const updateUserById = (id: String, values: Record<string, any>) =>
  UserModel.findByIdAndUpdate({ id, values });

export {
  UserModel,
  getUsers,
  getUserByEmail,
  getUserBySessionToken,
  getUserById,
  createUser,
  deleteUserById,
  updateUserById
};
