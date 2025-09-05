import { AddProductType, UpdateProductType, GetAllProductsType, GetProductByIdType, DeleteProductType } from "@/entities/productEntity";
import { prisma } from "@/prisma/client";
import { SupabaseUploadService } from "@/utils/supabase-upload";

export async function addProductService(payload: AddProductType) {
    const { name, price, categoryId, description, file } = payload;
    let imageUrl: string | null = null;

    if (file) {
        try {
            const uploadResult = await new SupabaseUploadService().uploadFile(file);
            imageUrl = uploadResult.url;
        } catch (uploadError) {
            console.error("Supabase upload error in service:", uploadError);
            const error = new Error("File upload failed");
            (error as any).cause = uploadError instanceof Error ? uploadError.message : "Unknown upload error";
            throw error;
        }
    }

    return prisma.product.create({
        data: {
            name,
            price,
            categoryId,
            description: description ?? null,
            imageProduct: imageUrl,
        },
    });
}

export async function getAllProductsService(filters: { minPrice?: number; maxPrice?: number }, options: GetAllProductsType) {
    const { minPrice, maxPrice } = filters;
    const { sortBy = 'createdAt', order = 'desc', limit = 10, offset } = options;

    const whereClause: any = {};
    if (minPrice !== undefined && maxPrice !== undefined) {
        whereClause.price = { gte: minPrice, lte: maxPrice };
    } else if (minPrice !== undefined) {
        whereClause.price = { gte: minPrice };
    } else if (maxPrice !== undefined) {
        whereClause.price = { lte: maxPrice };
    }

    const products = await prisma.product.findMany({
        where: whereClause,
        orderBy: { [sortBy]: order },
        take: limit,
        skip: offset ?? 0,
    });

    const total = await prisma.product.count({ where: whereClause });

    return { products, total };
}

export async function getProductByIdService(payload: GetProductByIdType) {
    const { id } = payload;
    return prisma.product.findUnique({ where: { id } });
}

export async function updateProductService(id: number, payload: UpdateProductType) {
    const { name, price, categoryId, description, file } = payload;
    const dataToUpdate: any = {};

    if (name !== undefined) dataToUpdate.name = name;
    if (price !== undefined) dataToUpdate.price = price;
    if (categoryId !== undefined) dataToUpdate.categoryId = categoryId;
    if (description !== undefined) dataToUpdate.description = description;

    if (file) {
        try {
            const uploadResult = await new SupabaseUploadService().uploadFile(file);
            dataToUpdate.imageProduct = uploadResult.url;
        } catch (uploadError) {
            console.error("Supabase upload error in service:", uploadError);
            const error = new Error("File upload failed");
            (error as any).cause = uploadError instanceof Error ? uploadError.message : "Unknown upload error";
            throw error;
        }
    }

    return prisma.product.update({
        where: { id },
        data: dataToUpdate,
    });
}

export async function deleteProductService(payload: DeleteProductType) {
    const { id } = payload;
    return prisma.product.delete({ where: { id } });
}
