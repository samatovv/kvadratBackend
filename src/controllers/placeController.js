import prisma from "../models/prisma.js";

export const getPlaces = async (req, res) => {
    try {
        const places = await prisma.places.findMany();
        res.json(places);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ошибка сервера" });
    }
};

export const createPlace = async (req, res) => {
    try {
        const { name } = req.body;
        const newPlace = await prisma.places.create({
            data: {
                name,
            },
        });
        res.status(201).json(newPlace);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ошибка сервера" });
    }
};