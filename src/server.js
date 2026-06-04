import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { connectMongoDB } from './db/connectMongoDB.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errors } from 'celebrate';
import { errorHandler } from './middleware/errorHandler.js';

import customersRoutes from './routes/customersRoutes.js';
import suppliersRoutes from './routes/suppliersRoutes.js';
import authRoutes from './routes/authRoutes.js';

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.json({ limit: '1mb' }));
app.use(cors());
app.use(logger);

app.use(customersRoutes);
app.use(suppliersRoutes);
app.use(authRoutes);

app.use(notFoundHandler);
app.use(errors());
app.use(errorHandler);

await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}....`);
});
