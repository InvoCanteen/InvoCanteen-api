import { Request, Response } from "express";
import { prisma } from "../prisma/client";
import { addProductSchema } from "../validation/productValidation";


export async function add_Product(req: Request, res: Response) {
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
        const { name, price, categoryId, description, imageProduct } = req.body;

        if (userRole !== "ADMIN") {
            res.status(403).json({ message: "Only admin can add products" });
            return
        }

        const product = await prisma.product.create({
            data: {
                name,
                price,
                categoryId,
                description,
                imageProduct
            },
        });

        res.status(201).json({
            message: "Product added successfully",
            product,
        });
    } catch (error) {
        res.json({ message: error });
    }
}

export async function get_All_Product(req: Request, res: Response) {
    const { sortBy, order, minPrice, maxPrice, limit, offset } = req.query

    const filters: any = {}
    if (minPrice) filters.price = { gte: parseFloat(minPrice as string) }
    if (maxPrice) {
        filters.price = {
            ...(filters.price || {}),
            lte: parseFloat(maxPrice as string)
        }
    }
    try {
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
        res.json({ message: error });
    }
}