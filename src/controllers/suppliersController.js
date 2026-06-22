import {
  addSupplierService,
  getSuppliersService,
  updateSupplierService,
} from '../services/suppliers.js';

export const getSuppliers = async (req, res) => {
  const data = await getSuppliersService(req.query);
  return res.status(200).json(data);
};

export const addSupplier = async (req, res) => {
  const newSupplier = await addSupplierService(req.body);
  return res.status(201).json(newSupplier);
};

export const updateSupplier = async (req, res) => {
  const { supplierId } = req.params;
  const supplier = await updateSupplierService(supplierId, req.body);
  return res.status(200).json(supplier);
};
