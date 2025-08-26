import { Request, Response, NextFunction } from "express";
import { verifyToken, JwtPayload } from "../utils/jwt";

export interface AuthRequest extends Request {
  user?: JwtPayload;
}

export function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }
  try {
    const decoded = verifyToken(token);
    req.user = decoded;


    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
}

export function adminAuthMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }
  try {
    const decoded = verifyToken(token);
    if (decoded.role !== "ADMIN")
      return res.status(403).json({ error: "protected route for admin only" });
    req.user = decoded;


    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
}