import { Order } from '../models/order.js';
import {
  calculatePaginationData,
  parsePaginationParams,
} from '../utils/pagination.js';
import { parseSortParams } from '../utils/sort.js';

export const getOrdersService = async (query) => {
  const { customer, status } = query;

  const { page, perPage, skip } = parsePaginationParams(query);
  const { sortBy, sortOrder } = parseSortParams(query);

  const filter = {};

  if (customer) {
    filter.name = { $regex: customer, $options: 'i' };
  }

  if (status) {
    filter.status = status;
  }

  const baseQuery = Order.find(filter);

  const [totalItems, orders] = await Promise.all([
    Order.countDocuments(filter),
    baseQuery
      .skip(skip)
      .limit(perPage)
      .sort({
        [sortBy]: sortOrder,
      }),
  ]);

  const paginationData = calculatePaginationData(totalItems, page, perPage);

  return {
    ...paginationData,
    orders,
  };
};
