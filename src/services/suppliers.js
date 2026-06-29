import createHttpError from 'http-errors';
import { Supplier } from '../models/supplier.js';
import {
  calculatePaginationData,
  parsePaginationParams,
} from '../utils/pagination.js';
import { parseSortParams } from '../utils/sort.js';

export const getSuppliersService = async (query) => {
  const { name } = query;

  const { page, perPage, skip } = parsePaginationParams(query);
  const { sortBy, sortOrder } = parseSortParams(query);

  const suppliersQuery = Supplier.find();

  if (name) {
    suppliersQuery.where({ name: { $regex: name, $options: 'i' } });
  }

  const [totalItems, suppliers] = await Promise.all([
    suppliersQuery.clone().countDocuments(),
    suppliersQuery
      .skip(skip)
      .limit(perPage)
      .sort({ [sortBy]: sortOrder }),
  ]);

  const paginationData = calculatePaginationData(totalItems, page, perPage);

  return { ...paginationData, suppliers };
};

export const addSupplierService = async (body) => {
  const newSupplier = await Supplier.create(body);
  return newSupplier;
};

export const updateSupplierService = async (supplierId, body) => {
  const supplier = await Supplier.findOneAndUpdate({ _id: supplierId }, body, {
    returnDocument: 'after',
  });
  if (!supplier) {
    throw createHttpError(404, 'Supplier not found');
  }
  return supplier;
};
