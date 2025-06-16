import { validateAccessToken } from "../services/tokenService";
import { Request, Response, NextFunction } from "express";

export default function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
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

  const decodedPayload = validateAccessToken(token);
  if (!decodedPayload) {
    res.status(401).json({ error: "invalid token" });
    return;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (req as any).user = decodedPayload;
  next();
}
