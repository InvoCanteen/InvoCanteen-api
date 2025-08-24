import { Request, Response } from "express";
import { prisma } from "../prisma/client";
import { addProductSchema } from "../validation/productValidation";
import { SupabaseUploadService } from "../utils/supabase-upload";

export async function addProduct(req: Request, res: Response) {
    const userId = (req as any).user.id
    const userRole = (req as any).user.role

    if (!userId || !userRole) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    try {
        const { error } = addProductSchema.validate(req.body);
        if (error) {
            res.status(400).json({ message: error.message });
            return;
        }
        const { name, price, categoryId, description } = req.body;
        const parsedCategoryId = categoryId ? parseInt(categoryId) : null;
        const file = req.file;
        let imageUrl = null;

        if (file) {
            try {
                const uploadResult = await new SupabaseUploadService().uploadFile(file);
                imageUrl = uploadResult.url;
            } catch (uploadError) {
                console.error("Supabase upload error:", uploadError);
                return res.status(400).json({
                    code: 400,
                    status: "error",
                    message: "File upload failed",
                    cause: uploadError instanceof Error ? uploadError.message : "Unknown upload error"
                });
            }
        }

        if (userRole !== "ADMIN") {
            res.status(403).json({ message: "Only admin can add products" });
            return;
        }

        const product = await prisma.product.create({
            data: {
                name,
                price,
                categoryId: parsedCategoryId,
                description,
                imageProduct: imageUrl
            },
        });

        res.status(201).json({
            message: "Product added successfully",
            product,
        });
    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({
            message: "An internal server error occurred."
        });
    }
}

export async function getAllProducts(req: Request, res: Response) {
    const { sortBy = 'createdAt', order = 'desc', minPrice, maxPrice, limit, offset } = req.query

    const allowedSortBy = ['name', 'price', 'createdAt', 'updatedAt'];

    const filters: any = {}
    if (minPrice) filters.price = { gte: parseFloat(minPrice as string) }
    if (maxPrice) {
        filters.price = {
            ...(filters.price || {}),
            lte: parseFloat(maxPrice as string)
        }
    }
    try {
        if (!allowedSortBy.includes(sortBy as string)) {
            return res.status(400).json({ message: "Invalid sort by parameter." });
        }

        const products = await prisma.product.findMany(
            {
                where: {
                    ...filters,
                },
                orderBy: {
                    [sortBy as string]: order as "asc" | "desc"
                },
                take: Number(limit),
                skip: Number(offset)
            }
        )
        const total = await prisma.product.count({ where: filters })
        res.status(200).json({ data: products, total })
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({
            message: "An internal server error occurred."
        });
    }
}

export async function updateProduct(req: Request, res: Response) {
    const userRole = (req as any).user.role;
    const { id } = req.params;

    if (!userRole) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    if (userRole !== "ADMIN") {
        return res.status(403).json({ message: "Only admin can update products" });
    }
    if (!id) {
        return res.status(400).json({ message: "Product ID is missing." });
    }

    const productId = parseInt(id);
    if (isNaN(productId)) {
        return res.status(400).json({ message: "Invalid product ID" });
    }

    try {
        const { name, price, categoryId, description } = req.body;
        const file = req.file;
        const dataToUpdate: any = {};
        if (name !== undefined) dataToUpdate.name = name;
        if (price !== undefined) dataToUpdate.price = price;
        if (categoryId !== undefined) dataToUpdate.categoryId = parseInt(categoryId) || null;
        if (description !== undefined) dataToUpdate.description = description;

        if (file) {
            try {
                const uploadResult = await new SupabaseUploadService().uploadFile(file);

                dataToUpdate.imageProduct = uploadResult.url;
            } catch (uploadError) {
                console.error("Supabase upload error:", uploadError);
                return res.status(400).json({
                    code: 400,
                    status: "error",
                    message: "File upload failed",
                    cause: uploadError instanceof Error ? uploadError.message : "Unknown upload error"
                });
            }
        }

        const existingProduct = await prisma.product.findUnique({ where: { id: productId } });
        if (!existingProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        const updatedProduct = await prisma.product.update({
            where: { id: productId },
            data: dataToUpdate,
        });

        res.status(200).json({
            message: "Product updated successfully",
            product: updatedProduct,
        });
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({
            message: "An internal server error occurred."
        });
    }
}

export async function detailProduct(req: Request, res: Response) {
    const { id } = req.params;

    if (!id) {
        return res.status(404).json({
            message: "Product Invalid",
        });
    }

    try {
        const product = await prisma.product.findUnique({
            where: {
                id: parseInt(id),
            },
        });

        if (!product) {
            return res.status(404).json({
                message: "Product not found",
            });
        }

        res.status(200).json({
            data: product,
        });
    } catch (error) {
        console.error("Error fetching product detail:", error);
        res.status(500).json({
            message: "An internal server error occurred.",
        });
    }
}

export async function deleteProduct(req: Request, res: Response) {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({
            message: "Invalid product ID",
        });
    }

    try {
        const product = await prisma.product.findUnique({
            where: { id: parseInt(id) }
        });

        if (!product) {
            return res.status(404).json({
                message: "Product not found",
            });
        }

        await prisma.product.delete({
            where: { id: parseInt(id, 10) },
        });

        res.status(200).json({
            message: "Product deleted successfully",
            data: product,
        });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({
            message: "An internal server error occurred.",
        });
    }
}
