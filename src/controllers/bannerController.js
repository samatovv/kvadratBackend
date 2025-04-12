import prisma from "../models/prisma.js";

export const createBanner = async (req, res) => {
    try {
      const { title } = req.body;
      const imageFile = req.file;
  
      if (!title || !imageFile) {
        return res.status(400).json({ message: 'Title и Image обязательны' });
      }
  
      console.log("🔥 imageFile", imageFile);
  
      // Создаем баннер в базе данных с использованием URL из imageFile.path
      const newBanner = await prisma.banner.create({
        data: {
          title,
          image: imageFile.path, // здесь уже URL от Cloudinary
        },
      });
  
      res.status(201).json(newBanner);
    } catch (err) {
      console.error('❌ Ошибка создания баннера:', err);
      res.status(500).json({ message: 'Ошибка сервера', error: err.message });
    }
  };
  
export const getBanners = async (req, res) => {
    try {
        const banners = await prisma.banner.findMany();

        const ip = req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        const today = new Date().toISOString().split('T')[0];

        const existingVisit = await prisma.metric.findFirst({
        where: {
            createdAt: {
            gte: new Date(`${today}T00:00:00.000Z`),
            lt: new Date(`${today}T23:59:59.999Z`)
            },
        },
        });

        const userType = existingVisit ? 'RETURNING' : 'NEW';

        await prisma.metric.create({
            data: {
                visits: 1,
                userType,
            },
        });

        res.json(banners);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ошибка сервера" });
    }
};

export const updateBanner = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, image } = req.body;
        const updatedBanner = await prisma.banner.update({
            where: { id },
            data: {
                title,
                image,
            },
        });
        res.json(updatedBanner);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ошибка сервера" });
    }
};

export const deleteBanner = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBanner = await prisma.banner.delete({
            where: { id },
        });
        res.json(deletedBanner);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ошибка сервера" });
    }
};

export const getBannerById = async (req, res) => {
    try {
        const { id } = req.params;

        // Преобразуем строку в целое число
        const parsedId = parseInt(id, 10);

        if (isNaN(parsedId)) {
            return res.status(400).json({ message: "Неверный формат ID" });
        }

        const banner = await prisma.banner.findUnique({
            where: { id: parsedId },
        });

        if (!banner) {
            return res.status(404).json({ message: "Баннер не найден" });
        }

        res.json(banner);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ошибка сервера" });
    }
};
