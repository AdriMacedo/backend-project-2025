import { Request, Response, NextFunction } from "express";
import { validateAccessToken } from "../utils/tokenService";
import { JwtPayload } from "jsonwebtoken";

export default function roleMiddleware(requireRole: string) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res.status(401).json({ error: "unauthorized" });
      return;
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      res.status(401).json({ error: "token missing" });
      return;
    }

    const decoded = validateAccessToken(token) as JwtPayload | null;

    if (!decoded || decoded.role !== requireRole) {
      res.status(403).json({ error: "forbidden" });
      return;
    }

    next();
  };
}
