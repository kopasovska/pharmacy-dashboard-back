import createHttpError from 'http-errors';
import { Supplier } from '../models/supplier.js';
import {
  calculatePaginationData,
  parsePaginationParams,
} from '../utils/pagination.js';
import { parseSortParams } from '../utils/sort.js';

export const getSuppliers = async (req, res) => {
  const { name } = req.query;

  const { page, perPage, skip } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);

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

  return res.status(200).json({ ...paginationData, suppliers });
};

export const addSupplier = async (req, res) => {
  const newSupplier = await Supplier.create(req.body);
  return res.status(201).json(newSupplier);
};

export const updateSupplier = async (req, res) => {
  const { supplierId } = req.params;

  const supplier = await Supplier.findOneAndUpdate(
    { _id: supplierId },
    req.body,
    { returnDocument: 'after' },
  );

  if (!supplier) {
    throw createHttpError(404, 'Supplier not found');
  }

  return res.status(200).json(supplier);
};
