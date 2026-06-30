import { getOrdersService } from '../services/orders.js';

export const getOrders = async (req, res, next) => {
  const data = await getOrdersService(req.query);
  res.status(200).json(data);
};
