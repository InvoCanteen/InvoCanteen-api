import { Request, Response } from "express";
import { addProductSchema, updateProductSchema, getAllProductsQuerySchema } from "@/validation/productValidation";
import {
  addProductService,
  deleteProductService,
  getAllProductsService,
  getProductByIdService,
  updateProductService
} from "@/services/productService";
import { ProductQueryOptions } from "@/entities/productEntity";

export async function addProduct(req: Request, res: Response) {
  const userId = (req as any).user.id;
  const userRole = (req as any).user.role;

  if (!userId || !userRole) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (userRole !== "ADMIN") {
    return res.status(403).json({ message: "Only admin can add products" });
  }

  try {
    const { error } = addProductSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.message ?? "Validation error" });
    }

    const { name, price, categoryId, description } = req.body;
    const file = req.file;
    const parseCategoryId = parseInt(categoryId as string, 10);

    const product = await addProductService({
      name,
      price,
      categoryId: parseCategoryId,
      description,
      file,
    });

    return res.status(201).json({
      message: "Product added successfully",
      product,
    });
  } catch (error) {
    console.error("Error in addProduct controller:", error);
    if (error instanceof Error && error.message.includes("upload failed")) {
      return res.status(400).json({ message: "File upload failed", cause: (error as any).cause });
    }
    return res.status(500).json({
      message: "An internal server error occurred.",
    });
  }
}

export async function getAllProducts(req: Request, res: Response) {
  try {
    const { error, value } = getAllProductsQuerySchema.validate(req.query);
    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const sortBy = (value.sortBy || "createdAt") as string;
    const order = (value.order || "desc") as 'asc' | 'desc';
    const limit = value.limit || 10;
    const offset = value.offset;
    const { minPrice, maxPrice } = value;

    const options: ProductQueryOptions = { sortBy, order, limit, offset };
    const { products, total } = await getAllProductsService(
      { minPrice, maxPrice },
      options
    );

    return res.status(200).json({ data: products, total });
  } catch (error) {
    console.error("Error in getAllProducts controller:", error);
    return res.status(500).json({
      message: "An internal server error occurred.",
    });
  }
}

export async function updateProduct(req: Request, res: Response) {
  const userRole = (req as any).user.role;
  const { id } = req.params;

  if (userRole !== "ADMIN") {
    return res.status(403).json({ message: "Only admin can update products" });
  }

  const productId = parseInt(id as string, 10);
  if (isNaN(productId)) {
    return res.status(400).json({ message: "Invalid product ID" });
  }

  try {
    if (req.body.categoryId && typeof req.body.categoryId === "string") {
      req.body.categoryId = parseInt(req.body.categoryId, 10);
    }

    const { error, value } = updateProductSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const existingProduct = await getProductByIdService(productId);
    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    const { name, price, categoryId, description } = value;
    const file = req.file;

    const updatedProduct = await updateProductService(productId, {
      name,
      price: price ? parseFloat(price as string) : undefined,
      categoryId,
      description,
      file,
    });

    return res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Error in updateProduct controller:", error);
    if (error instanceof Error && error.message.includes("upload failed")) {
      return res.status(400).json({ message: "File upload failed", cause: (error as any).cause });
    }
    return res.status(500).json({
      message: "An internal server error occurred.",
    });
  }
}

export async function detailProduct(req: Request, res: Response) {
  const { id } = req.params;
  const productId = parseInt(id as string, 10);

  if (isNaN(productId)) {
    return res.status(400).json({
      message: "Invalid Product ID",
    });
  }

  try {
    const product = await getProductByIdService(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    return res.status(200).json({
      data: product,
    });
  } catch (error) {
    console.error("Error in detailProduct controller:", error);
    return res.status(500).json({
      message: "An internal server error occurred.",
    });
  }
}

export async function deleteProduct(req: Request, res: Response) {
  const userRole = (req as any).user.role;
  const { id } = req.params;
  const productId = parseInt(id as string, 10);

  if (isNaN(productId)) {
    return res.status(400).json({ message: "Product ID is required" });
  }

  if (userRole !== "ADMIN") {
    return res.status(403).json({ message: "Only admin can delete products" });
  }

  try {
    const product = await getProductByIdService(productId);
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    const deletedProduct = await deleteProductService(productId);

    return res.status(200).json({
      message: "Product deleted successfully",
      data: deletedProduct,
    });
  } catch (error) {
    console.error("Error in deleteProduct controller:", error);
    return res.status(500).json({
      message: "An internal server error occurred.",
    });
  }
}
