export interface AddProductType {
    name: string;
    price: number;
    categoryId: number;
    description?: string;
    file?: Express.Multer.File;
}

export interface UpdateProductType {
    id: number;
    name?: string;
    price?: number;
    categoryId?: number;
    description?: string;
    file?: Express.Multer.File;
}

export interface GetAllProductsType {
    sortBy?: string;
    order?: 'asc' | 'desc';
    limit?: number;
    offset?: number;
    minPrice?: number;
    maxPrice?: number;
}

export interface GetProductByIdType {
    id: number;
}

export interface DeleteProductType {
    id: number;
}
