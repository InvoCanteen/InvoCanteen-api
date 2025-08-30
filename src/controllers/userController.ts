import { Request, Response } from "express";
import {
  registerCashierSchema,
  loginCashierSchema,
} from "@/validation/userValidation";
import { CashierUsecase } from "@/usecases/userUsecase";
import { prisma } from "@/prisma/client";
import { SupabaseUploadService } from "@/utils/supabase-upload";
import bcrypt from "bcrypt";

export class CashierController {
  static async register(req: Request, res: Response) {
    try {
      const { error, value } = registerCashierSchema.validate(req.body);
      if (error) {
        return res
          .status(400)
          .json({ error: error.details?.[0]?.message || "Validation error" });
      }

      const cashier = await CashierUsecase.register(value);
      return res.status(200).json({
        code: 200,
        message: "Register success",
        status: "success",
        data: {
          cashier,
        },
      });
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { error, value } = loginCashierSchema.validate(req.body);
      if (error) {
        return res
          .status(400)
          .json({ error: error.details?.[0]?.message || "Validation error" });
      }

      const result = await CashierUsecase.login(value);
      res.cookie("token", result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
      });
      return res.json({
        message: "Login success",
        data: { ...result },
      });
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }

  static async logout(req: Request, res: Response) {
    try {
      res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

      res.json({
        message: "Logout successful",
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Logout failed" });
    }
  }

  static async getProfile(req: Request, res: Response) {
    const userId = (req as any).user.id;
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          email: true,
          name: true,
          photoProfile: true,
          role: true,
        },
      });
      res.status(200).json({ user });
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({
        message: "An internal server error occurred.",
      });
    }
  }

  static async updateProfile(req: Request, res: Response) {
    const currentUserId = (req as any).user.id;

    if (!currentUserId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const { name } = req.body;
    const file = req.file;
    if (!file) {
      return res
        .status(400)
        .json({ message: "No profile picture file provided." });
    }

    try {
      const currentUser = await prisma.user.findUnique({
        where: { id: currentUserId },
        select: { photoProfile: true },
      });

      if (!currentUser) {
        return res.status(404).json({ message: "User not found." });
      }

      const oldPhotoProfileUrl = currentUser.photoProfile;

      const uploadService = new SupabaseUploadService();
      const uploadResult = await uploadService.uploadFile(file);
      const profilePictureUrl = uploadResult.url;

      const updatedUser = await prisma.user.update({
        where: { id: currentUserId },
        data: {
          name,
          photoProfile: profilePictureUrl,
        },
        select: {
          id: true,
          name: true,
          email: true,
          photoProfile: true,
          role: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      if (oldPhotoProfileUrl) {
        const fileName = oldPhotoProfileUrl.split("/").pop();
        if (fileName) {
          await uploadService.deleteFile(fileName);
        }
      }

      res.status(200).json({
        message: "Profile picture updated successfully",
        user: updatedUser,
      });
    } catch (error) {
      console.error("Error updating profile picture:", error);
      if (error instanceof Error && error.message.includes("upload failed")) {
        return res.status(400).json({ message: "File upload failed." });
      }
      res.status(500).json({
        message: "An internal server error occurred.",
      });
    }
  }

  static async updatePasswod(req: Request, res: Response) {
    const currentUserId = (req as any).user.id;

    if (!currentUserId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const { newpassword } = req.body;

    const hashedPassword = await bcrypt.hash(newpassword, 10);

    try {
      const currentUser = await prisma.user.findUnique({
        where: { id: currentUserId },
      });

      if (!currentUser) {
        return res.status(404).json({ message: "User not found." });
      }

      const updatedUser = await prisma.user.update({
        where: { id: currentUserId },
        data: {
          password: hashedPassword,
        },
      });

      res.status(200).json({
        message: "Password updated successfully",
        user: updatedUser,
      });
    } catch (error) {
      console.error("Error updating profile picture:", error);
      if (error instanceof Error && error.message.includes("upload failed")) {
        return res.status(400).json({ message: "File upload failed." });
      }
      res.status(500).json({
        message: "An internal server error occurred.",
      });
    }
  }
}
