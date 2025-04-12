import express from 'express';
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../controllers/productController.js';
import { upload } from '../utils/cloudinary.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Продукты
 */

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Создание продукта
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Products
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               images:
 *                 type: file
 *               title:
 *                 type: string
 *               price:
 *                 type: integer
 *               square:
 *                 type: string
 *               description:
 *                 type: string
 *               placeId:
 *                 type: integer
 *               rooms:
 *                 type: integer
 *               bathrooms:
 *                 type: integer
 *               yearBuilt:
 *                 type: integer
 *               bedrooms:
 *                 type: integer
 *               kitchen:
 *                 type: integer
 *               type:
 *                 type: string
 *                 example: HOUSE
 *               garage:
 *                 type: integer
 *               elevator:
 *                 type: boolean
 *               garden:
 *                 type: boolean
 *               fireplace:
 *                 type: boolean
 *               playground:
 *                 type: boolean
 *               laundry:
 *                 type: boolean
 *               parking:
 *                 type: boolean
 *               gym:
 *                 type: boolean
 *               pool:
 *                 type: boolean
 *               clubhouse:
 *                 type: boolean
 *               garages:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Продукт создан
 *       500:
 *         description: Ошибка сервера
 */
router.post('/', authenticateToken, upload.array('images', 10), createProduct);

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Получение списка продуктов с фильтрами
 *     tags:
 *       - Products
 *     parameters:
 *       - in: query
 *         name: place
 *         schema:
 *           type: integer
 *         description: ID местоположения
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [HOUSE, APARTMENT, COMMERCIAL, LAND]
 *         description: Тип недвижимости
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: integer
 *         description: Минимальная цена
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: integer
 *         description: Максимальная цена
 *       - in: query
 *         name: elevator
 *         schema:
 *           type: string
 *           enum: [true]
 *         description: Есть ли лифт
 *       - in: query
 *         name: garden
 *         schema:
 *           type: string
 *           enum: [true]
 *         description: Есть ли сад
 *       - in: query
 *         name: fireplace
 *         schema:
 *           type: string
 *           enum: [true]
 *         description: Есть ли камин
 *       - in: query
 *         name: playground
 *         schema:
 *           type: string
 *           enum: [true]
 *         description: Есть ли игровая площадка
 *       - in: query
 *         name: laundry
 *         schema:
 *           type: string
 *           enum: [true]
 *         description: Есть ли прачечная
 *       - in: query
 *         name: parking
 *         schema:
 *           type: string
 *           enum: [true]
 *         description: Есть ли парковка
 *       - in: query
 *         name: gym
 *         schema:
 *           type: string
 *           enum: [true]
 *         description: Есть ли тренажёрный зал
 *       - in: query
 *         name: pool
 *         schema:
 *           type: string
 *           enum: [true]
 *         description: Есть ли бассейн
 *       - in: query
 *         name: clubhouse
 *         schema:
 *           type: string
 *           enum: [true]
 *         description: Есть ли клубный дом
 *       - in: query
 *         name: garages
 *         schema:
 *           type: string
 *           enum: [true]
 *         description: Есть ли гаражи
 *     responses:
 *       200:
 *         description: Список продуктов
 *       500:
 *         description: Ошибка сервера
 */
router.get('/', getProducts);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Получение продукта по ID
 *     tags:
 *       - Products
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID продукта
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Продукт
 *       404:
 *         description: Продукт не найден
 *       500:
 *         description: Ошибка сервера
 */
router.get('/:id', getProductById);


/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Обновление продукта по ID
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Products
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID продукта
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
 *               image:
 *                 type: file
 *               title:
 *                 type: string
 *               price:
 *                 type: integer
 *               square:
 *                 type: string
 *               description:
 *                 type: string
 *               rooms:
 *                 type: integer
 *               bathrooms:
 *                 type: integer
 *               yearBuilt:
 *                 type: integer
 *               bedrooms:
 *                 type: integer
 *               kitchen:
 *                 type: boolean
 *               type:
 *                 type: string
 *               garage:
 *                 type: integer
 *               elevator:
 *                 type: boolean
 *               garden:
 *                 type: boolean
 *               fireplace:
 *                 type: boolean
 *               playground:
 *                 type: boolean
 *               laundry:
 *                 type: boolean
 *               parking:
 *                 type: boolean
 *               gym:
 *                 type: boolean
 *               pool:
 *                 type: boolean
 *               clubhouse:
 *                 type: boolean
 *               garages:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Продукт обновлен
 *       404:
 *         description: Продукт не найден
 *       500:
 *         description: Ошибка сервера
 */
router.put('/:id', authenticateToken, upload.single('image'), updateProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Удаление продукта по ID
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Products
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID продукта
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Продукт удален
 *       404:
 *         description: Продукт не найден
 *       500:
 *         description: Ошибка сервера
 */
router.delete('/:id', authenticateToken, deleteProduct);

export default router;