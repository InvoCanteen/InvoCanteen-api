import Joi from "joi";

export const addProductSchema = Joi.object({
  name: Joi.string().min(4).required(),
  price: Joi.number().min(1000).required(),
  categoryId: Joi.alternatives().try(Joi.number(), Joi.string().pattern(/^\d+$/)).optional(),
  description: Joi.string().min(5).optional(),
  imageProduct: Joi.string().optional(),
});

export const updateProductSchema = Joi.object({
  name: Joi.string().min(4).optional(),
  price: Joi.number().min(1000).optional(),
  categoryId: Joi.alternatives().try(Joi.number(), Joi.string().pattern(/^\d+$/)).optional(),
  description: Joi.string().min(5).optional(),
  imageProduct: Joi.string().optional(),
});

export const getAllProductsQuerySchema = Joi.object({
  sortBy: Joi.string().valid("name", "price", "createdAt", "updatedAt").optional(),
  order: Joi.string().valid("asc", "desc").optional(),
  limit: Joi.number().integer().min(1).max(100).optional(),
  offset: Joi.number().integer().min(0).optional(),
  minPrice: Joi.number().min(0).optional(),
  maxPrice: Joi.number().min(0).optional(),
});

