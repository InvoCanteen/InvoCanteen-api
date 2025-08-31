import { AddProductPayload, ProductFilters, ProductQueryOptions, UpdateProductPayload } from "@/entities/productEntity";
import { prisma } from "@/prisma/client";
import { SupabaseUploadService } from "@/utils/supabase-upload";
import { Prisma } from "@prisma/client";

export async function addProductService(payload: AddProductPayload) {
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

export async function getAllProductsService(filters: ProductFilters, options: ProductQueryOptions) {
    const { minPrice, maxPrice } = filters;
    const { sortBy = 'createdAt', order = 'desc', limit = 10, offset = 0 } = options;

    const whereClause: Prisma.ProductWhereInput = {};
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
        skip: offset,
    });

    const total = await prisma.product.count({ where: whereClause });

    return { products, total };
}

export async function getProductByIdService(id: number) {
    return prisma.product.findUnique({ where: { id } });
}

export async function updateProductService(id: number, payload: UpdateProductPayload) {
    const { name, price, categoryId, description, file } = payload;
    const dataToUpdate: Prisma.ProductUncheckedUpdateInput = {};

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

export async function deleteProductService(id: number) {
    return prisma.product.delete({ where: { id } });
}