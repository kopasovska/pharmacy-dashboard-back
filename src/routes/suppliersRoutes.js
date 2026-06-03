import { Router } from 'express';
import {
  addSupplier,
  getSuppliers,
  updateSupplier,
} from '../controllers/suppliersController.js';
import { celebrate } from 'celebrate';
import {
  getSuppliersSchema,
  updateSupplierSchema,
} from '../validations/supplierValidation.js';

const router = new Router();

router.get('/suppliers', celebrate(getSuppliersSchema), getSuppliers);
router.post('/suppliers', addSupplier);
router.patch(
  '/suppliers/:supplierId',
  celebrate(updateSupplierSchema),
  updateSupplier,
);

export default router;
