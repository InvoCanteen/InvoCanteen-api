import Joi from "joi";

export const addProductSchema = Joi.object({
  name: Joi.string().min(4).required(),
  price: Joi.number().min(1000).required(),
  categoryId: Joi.number().optional(),
  description: Joi.string().min(5).optional(),
  imageProduct: Joi.string().optional(),
});

