import { Router } from 'express';
import { celebrate } from 'celebrate';
import { authenticate } from '../middleware/authenticate.js';
import { getOrders } from '../controllers/ordersController.js';
import { getOrdersSchema } from '../validations/ordersValidation.js';

const router = Router();

router.use('/orders', authenticate);

router.get('/orders', celebrate(getOrdersSchema), getOrders);

export default router;
