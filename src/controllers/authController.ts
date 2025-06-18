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
    console.log(hashedPassword);

    const newUser = new User({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: "user",
    });

    await newUser.save();

    res.status(201).json({ message: "user registered sucessfully" });
  } catch (error) {
    res.status(500).json({ message: "server error", error });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ message: "please fill all fields" });
      return;
    }

    const user = await User.findOne({ email });
    console.log("user: ", user);
    if (!user) {
      res.status(400).json({ message: "invalid credentials" });
      return;
    }
    console.log("Email recebido:", email);
    console.log("Utilizador encontrado:", user);
    console.log("Password recebida:", password);
    console.log("Password na BD:", user.password);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Resultado do compare:", isMatch);

    if (!isMatch) {
      res.status(400).json({ message: "invalid credentials" });
      return;
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );
    res.status(200).json({ token, message: "login successful" });
    return;
  } catch (error) {
    res.status(500).json({ message: "server error", error });
  }
};
