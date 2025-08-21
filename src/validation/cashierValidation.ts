import Joi from "joi";

export const registerCashierSchema = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().optional(),
  password: Joi.string().min(6).required(),
  photoProfile: Joi.string().uri().allow(null).optional(),
});

export const loginCashierSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
