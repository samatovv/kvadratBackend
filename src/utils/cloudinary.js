import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

// Настройка Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Настройка хранилища для Multer с использованием Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'products', // Папка в Cloudinary
    allowed_formats: ['jpg', 'png', 'jpeg'], // Разрешенные форматы
  },
});

// Создаем middleware для загрузки файлов
const upload = multer({ storage });

export { cloudinary, storage, upload };
