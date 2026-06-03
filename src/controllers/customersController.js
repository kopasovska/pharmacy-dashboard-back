import { Customer } from '../models/customer.js';

export const getCustomers = async (req, res, next) => {
  const {
    page = 1,
    perPage = 10,
    name,
    sortBy = '_id',
    sortOrder = 'asc',
  } = req.query;

  const skip = (page - 1) * perPage;

  const customersQuery = Customer.find();

  if (name) {
    customersQuery.where({
      name: { $regex: name, $options: 'i' },
    });
  }

  const [totalItems, customers] = await Promise.all([
    customersQuery.clone().countDocuments(),
    customersQuery
      .skip(skip)
      .limit(perPage)
      .sort({
        [sortBy]: sortOrder,
      }),
  ]);

  const totalPages = Math.ceil(totalItems / perPage);

  res.status(200).json({
    page,
    perPage,
    totalItems,
    totalPages,
    customers,
  });
};
