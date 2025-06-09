import bcrypt from "bcrypt";
import User from "../models/userModel";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";


export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(400).json({ message: "please fill all the fields." });
      return;
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "email is already registered" });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: "user",
    });

    await newUser.save();

    res.status(201).json({ message: "user registered sucessfully" });
  } catch (error) {
    res.status(500).json({ message: "server error", error });
  }
};



export const login = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {email, password} = req.body;
    if(!email || !password) {
      res.status(400).json({message: "please fill all fields"});
      return;
    }

    const user = await User.findOne({email});
    if(!user) {
      res.status(400).json({message: "invalid credentials"});
      return;
    }
      const isMatch = await bcrypt.compare(password, user.password);
      if(!isMatch) {
        res.status(400).json({message: "invalid credentials"});
        return;
      };

      const token = jwt.sign(
        {userId: user._id, role: user.role}, process.env.JWT_SECRET!,{expiresIn: "1h"}
      );
      res.status(200).json({token, message: "login sucessful"});
      return;

    
  } catch (error) {
    res.status(500).json({message: "server error", error});
  }
}