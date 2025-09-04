export interface AddProductPayload {
    name: string;
    price: number;
    categoryId: number | null;
    description?: string | undefined;
    file?: Express.Multer.File | undefined;
}

export interface UpdateProductPayload {
    name?: string | undefined;
    price?: number | undefined;
    categoryId?: number | null | undefined;
    description?: string | undefined;
    file?: Express.Multer.File | undefined;
}

export interface ProductFilters {
    minPrice?: number | undefined;
    maxPrice?: number | undefined;
}

export interface ProductQueryOptions {
    sortBy: string;
    order: 'asc' | 'desc';
    limit: number;
    offset?: number;
}
