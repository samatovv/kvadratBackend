import express from 'express';
import { getPlaces, createPlace } from '../controllers/placeController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Places
 *   description: Места
 */

/**
 * @swagger
 * /api/places:
 *   get:
 *     summary: Получение списка мест
 *     tags:
 *       - Places
 *     responses:
 *       200:
 *         description: Список мест
 *       500:
 *         description: Ошибка сервера
 */
router.get('/', getPlaces);

/**
 * @swagger
 * /api/places:
 *   post:
 *     summary: Создание места
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Places
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Место создано
 *       500:
 *         description: Ошибка сервера
 */
router.post('/', authenticateToken, createPlace);

export default router;