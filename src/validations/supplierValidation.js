import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';

const objectIdValidator = (value, helpers) => {
  return !isValidObjectId(value) ? helpers.message('Invalid id format') : value;
};

export const updateSupplierSchema = {
  [Segments.PARAMS]: Joi.object({
    supplierId: Joi.string().custom(objectIdValidator).required(),
  }),
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(3).max(30),
    address: Joi.string().min(5).max(120),
    suppliers: Joi.string().min(3).max(30),
    date: Joi.date(),
    amount: Joi.number().min(0),
    status: Joi.string().valid('Active', 'Inactive'),
  }).min(1),
};
