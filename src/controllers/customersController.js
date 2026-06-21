import { getCustomersService } from '../services/customers.js';

export const getCustomers = async (req, res, next) => {
  const data = await getCustomersService(req.query);
  res.status(200).json(data);
};
