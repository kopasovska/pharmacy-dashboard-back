import { Router } from 'express';
import {
  addSupplier,
  getSuppliers,
  updateSupplier,
} from '../controllers/suppliersController.js';

const router = new Router();

router.get('/suppliers', getSuppliers);
router.post('/suppliers', addSupplier);
router.put('/suppliers/:supplierId', updateSupplier);

export default router;
