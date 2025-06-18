import userModel, { IUser } from "../models/userModel";

export const getAllUsers = async () => {
  return await userModel.find();
};

export const updateUser = async (id: string, updateData: Partial<IUser>) => {
  return await userModel.findByIdAndUpdate(id, updateData, { new: true });
};

export const deleteUser = async (id: string) => {
  return await userModel.findByIdAndDelete(id);
};
