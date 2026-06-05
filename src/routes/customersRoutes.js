import { Router } from 'express';
import { getCustomers } from '../controllers/customersController.js';
import { getCustomersSchema } from '../validations/customersValidation.js';
import { celebrate } from 'celebrate';
import { authenticate } from '../middleware/authenticate.js';

const router = Router();

router.use('/customers', authenticate);

router.get('/customers', celebrate(getCustomersSchema), getCustomers);

export default router;
