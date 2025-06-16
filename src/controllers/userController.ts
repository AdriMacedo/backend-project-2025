import { Request, Response } from "express";
import * as userService from "../services/userService";


export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "error fetching users", error });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const updateData = req.body;
    const updatedUser = await userService.updateUser(id, updateData);

    if (!updatedUser) {
      res.status(404).json({ message: "user not found" });
      return;
    }
    res.json({ message: "user updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "error updating user", error });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const deletedUser = await userService.deleteUser(id);

    if (!deletedUser) {
      res.status(404).json({ message: "user not found" });
      return;
    }
    res.json({ message: "user deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "error deleting user", error });
  }
};
