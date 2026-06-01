import { Supplier } from '../models/supplier.js';

export const getSuppliers = async (req, res) => {
  const suppliers = await Supplier.find();
  return res.status(200).json(suppliers);
};

export const addSupplier = async (req, res) => {
  const newSupplier = await Supplier.create(req.body);
  return res.status(201).json(newSupplier);
};
