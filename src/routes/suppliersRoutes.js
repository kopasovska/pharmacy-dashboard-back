import { Router } from 'express';
import {
  addSupplier,
  getSuppliers,
} from '../controllers/suppliersController.js';

const router = new Router();

router.get('/suppliers', getSuppliers);
router.post('/suppliers', addSupplier);

export default router;
