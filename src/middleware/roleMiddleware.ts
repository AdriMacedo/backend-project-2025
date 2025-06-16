/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from "express";

export default function roleMiddleware(requireRole: string) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const user = (req as any).user;

    console.log(" user from req: ", user);
    if (!user) {
      console.log("no user found");
      res.status(401).json({ error: "unauthorized" });
      return;
    }
    if (user.role !== requireRole) {
      console.log(
        `roleMiddleware - user role (${user.role}) does not match required role (${requireRole})`
      );
      res.status(403).json({ error: "access denied. Admins only" });
      return;
    }

    console.log("role autorizdo");
    next();
  };
}
