import { Customer } from '../models/customer';

export const getCustomers = async (req, res, next) => {
  const customers = await Customer.find();
  res.status(200).json(customers);
};
