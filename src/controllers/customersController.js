import { Customer } from '../models/customer.js';
import {
  calculatePaginationData,
  parsePaginationParams,
} from '../utils/pagination.js';
import { parseSortParams } from '../utils/sort.js';

export const getCustomers = async (req, res, next) => {
  const { name } = req.query;

  const { page, perPage, skip } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);

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

  const paginationData = calculatePaginationData(totalItems, page, perPage);

  res.status(200).json({
    ...paginationData,
    customers,
  });
};
