import prisma from "../models/prisma.js";
import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';
const uploadToCloudinary = (fileBuffer) => {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream((error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url);
      });
      streamifier.createReadStream(fileBuffer).pipe(stream);
    });
  };

export const createProduct = async (req, res) => {
    try {
      const {
        title,
        price,
        square,
        description,
        placeId,
        rooms,
        bathrooms,
        yearBuilt,
        bedrooms,
        kitchen,
        type,
        garage,
        elevator,
        garden,
        fireplace,
        playground,
        laundry,
        parking,
        gym,
        pool,
        clubhouse,
        garages
      } = req.body;
  
      const imageUrls = [];
        for (const file of req.files) {
        imageUrls.push(file.path); // ✅ уже загружено, просто путь
        }

  
        if (!title || !price || !square || imageUrls.length === 0) {
            return res.status(400).json({ message: 'Title, Price, Square и Images обязательны' });
        }
  
      const newProduct = await prisma.product.create({
        data: {
          title,
          price: Number(price),
          square,
          description,
          placeId: Number(placeId),
          rooms: rooms && Number(rooms),
          bathrooms: bathrooms ? Number(bathrooms) : null,
          yearBuilt: yearBuilt ? Number(yearBuilt) : null,
          bedrooms: bedrooms ? Number(bedrooms) : null,
          kitchen: kitchen ? Number(kitchen) : null,
          type,
          garage: garage ? Number(garage) : null,
          elevator: elevator === 'true',
          garden: garden === 'true',
          fireplace: fireplace === 'true',
          playground: playground === 'true',
          laundry: laundry === 'true',
          parking: parking === 'true',
          gym: gym === 'true',
          pool: pool === 'true',
          clubhouse: clubhouse === 'true',
          garages: garages === 'true',
          images: imageUrls,
        },
      });
  
      res.status(201).json(newProduct);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Ошибка сервера" });
    }
}

export const getProducts = async (req, res) => {
    try {
        const {
            place,        // это placeId теперь!
            type,
            minPrice,
            maxPrice,
            ...amenities
        } = req.query;

        const filters = {};

        // Фильтр по placeId (нужно привести к числу)
        if (place) {
            filters.placeId = parseInt(place);
        }

        // Фильтр по типу недвижимости
        if (type) {
            filters.type = type;
        }

        // Фильтр по цене
        if (minPrice || maxPrice) {
            filters.price = {};
            if (minPrice) filters.price.gte = parseInt(minPrice);
            if (maxPrice) filters.price.lte = parseInt(maxPrice);
        }

        // Фильтр по удобствам
        const amenityFields = [
            "elevator", "garden", "fireplace", "playground", "laundry",
            "parking", "gym", "pool", "clubhouse", "garages"
        ];

        for (const key of amenityFields) {
            if (amenities[key] === 'true') {
                filters[key] = true;
            }
        }

        const products = await prisma.product.findMany({
            where: filters,
            include: {
                place: true, // 👈 Если хочешь возвращать данные места (название и т.д.)
            },
        });

        // Метрика просмотров
        await prisma.metric.create({
            data: {
                pageViews: 1,
                productId: null,
                userType: 'NEW'
            },
        });

        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ошибка сервера" });
    }
};


export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await prisma.product.findUnique({
            where: { id: parseInt(id, 10) }, // Преобразуем строку в число
        });
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ошибка сервера" });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, price, square, description } = req.body;
        const updatedProduct = await prisma.product.update({
            where: { id },
            data: {
                title,
                price: Number(price),
                square,
                description,
            },
        });
        res.json(updatedProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ошибка сервера" });
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await prisma.product.delete({
            where: { id },
        });
        res.json(deletedProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ошибка сервера" });
    }
}