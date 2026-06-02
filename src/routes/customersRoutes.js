import { Router } from 'express';
import { getCustomers } from '../controllers/customersController.js';
import { getCustomersSchema } from '../validations/customersValidation.js';
import { celebrate } from 'celebrate';

const router = Router();

router.get('/customers', celebrate(getCustomersSchema), getCustomers);

export default router;
