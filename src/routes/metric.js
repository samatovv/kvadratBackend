import express from 'express';
import { getMetrics } from '../controllers/metricController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Metrics
 *   description: Метрики
 */

/**
 * @swagger
 * /api/metrics:
 *   get:
 *     summary: Получение списка метрик
 *     tags:
 *       - Metrics
 *     parameters:
 *       - in: query
 *         name: startDate
 *         description: "Начальная дата для фильтрации (формат: YYYY-MM-DD)"
 *         required: false
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: endDate
 *         description: "Конечная дата для фильтрации (формат: YYYY-MM-DD)"
 *         required: false
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: Список метрик
 *       500:
 *         description: Ошибка сервера
 */


router.get('/', getMetrics);

export default router;