import { Joi, Segments } from 'celebrate';

export const getCustomersSchema = {
  [Segments.PARAMS]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(5).max(50).default(10),
    name: Joi.string().min(1).max(30),
  }),
};
