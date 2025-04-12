import express from 'express';
import { getBanners, getBannerById, createBanner, updateBanner, deleteBanner } from '../controllers/bannerController.js';
import { upload } from '../utils/cloudinary.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Banners
 *   description: Баннеры
 */

/**
 * @swagger
 * /api/banners:
 *   get:
 *     summary: Получение списка баннеров
 *     tags:
 *       - Banners
 *     responses:
 *       200:
 *         description: Список баннеров
 *       500:
 *         description: Ошибка сервера
 */
router.get('/', getBanners);

/**
 * @swagger
 * /api/banners/{id}:
 *   get:
 *     summary: Получение баннера по ID
 *     tags:
 *       - Banners
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID баннера
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Баннер
 *       404:
 *         description: Баннер не найден
 *       500:
 *         description: Ошибка сервера
 */
router.get('/:id', getBannerById);

/**
 * @swagger
 * /api/banners:
 *   post:
 *     summary: Создание баннера
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Banners
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               image:
 *                 type: file
 *     responses:
 *       201:
 *         description: Баннер создан
 *       500:
 *         description: Ошибка сервера
 */
router.post('/', authenticateToken, upload.single('image'), createBanner);

/**
 * @swagger
 * /api/banners/{id}:
 *   put:
 *     summary: Обновление баннера по ID
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Banners
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID баннера
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               image:
 *                 type: file
 *     responses:
 *       200:
 *         description: Баннер обновлен
 *       404:
 *         description: Баннер не найден
 *       500:
 *         description: Ошибка сервера
 */
router.put('/:id', authenticateToken, updateBanner);

/**
 * @swagger
 * /api/banners/{id}:
 *   delete:
 *     summary: Удаление баннера по ID
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Banners
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID баннера
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Баннер удален
 *       404:
 *         description: Баннер не найден
 *       500:
 *         description: Ошибка сервера
 */
router.delete('/:id', authenticateToken, deleteBanner);

export default router;