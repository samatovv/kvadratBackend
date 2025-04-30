import express from 'express';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import path from 'path';
import { fileURLToPath } from 'url';

import authRoutes from './routes/auth.js';
import bannerRoutes from './routes/banner.js';
import productRoutes from './routes/product.js';
import metricRoutes from './routes/metric.js';
import placeRoutes from './routes/place.js';
import cors from 'cors';

dotenv.config();
const app = express();

// Настройка CORS до маршрутов
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:5173'],  // Разрешение для нескольких источников
    credentials: true,
}));

app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Kvadrat API',
      version: '1.0.0',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: [path.join(__dirname, './routes/*.js')],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Роуты
app.use('/api/auth', authRoutes);
app.use('/api/banners', bannerRoutes);
app.use('/api/products', productRoutes);
app.use('/api/metrics', metricRoutes);
app.use('/api/places', placeRoutes);

// Глобальный обработчик ошибок
app.use((err, req, res, next) => {
  console.error('🧨 Global error handler:', err);
  res.status(500).json({
    message: 'Internal Server Error',
    error: err.message,
    stack: err.stack,
  });
});

export default app;
