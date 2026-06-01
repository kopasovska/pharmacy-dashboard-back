import createHttpError from 'http-errors';
import { Supplier } from '../models/supplier.js';

export const getSuppliers = async (req, res) => {
  const suppliers = await Supplier.find();
  return res.status(200).json(suppliers);
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
