import prisma from "../models/prisma.js";

export const getMetrics = async (req, res) => {
  try {
    const { startDate, endDate, productId, bannerId } = req.query; // Получаем параметры

    const where = {};

    if (startDate && endDate) {
      where.createdAt = {
        gte: new Date(startDate),
        lte: new Date(endDate),
      };
    } else if (startDate) {
      where.createdAt = {
        gte: new Date(startDate),
      };
    } else if (endDate) {
      where.createdAt = {
        lte: new Date(endDate),
      };
    }

    // Если фильтруем по productId или bannerId
    if (productId) where.productId = parseInt(productId);
    if (bannerId) where.bannerId = parseInt(bannerId);

    // Группируем данные по userType
    const metrics = await prisma.metric.groupBy({
      by: ['userType'], // Группируем по типу пользователя
      where,
      _sum: {
        pageViews: true,
        visits: true,
      },
      _count: {
        id: true, // Считаем количество записей
      },
    });

    // Данные для новых и повторных пользователей
    const newUsersData = metrics.find(m => m.userType === 'NEW') || { _sum: { pageViews: 0, visits: 0 }, _count: { id: 0 } };
    const returningUsersData = metrics.find(m => m.userType === 'RETURNING') || { _sum: { pageViews: 0, visits: 0 }, _count: { id: 0 } };

    // Общие данные
    const totalCount = newUsersData._count.id + returningUsersData._count.id;
    const newUserPercentage = totalCount > 0 ? ((newUsersData._count.id / totalCount) * 100).toFixed(2) : 0;
    const returningUserPercentage = totalCount > 0 ? ((returningUsersData._count.id / totalCount) * 100).toFixed(2) : 0;

    // Формируем результат
    const result = {
      newUsersCount: newUsersData._count.id,
      returningUsersCount: returningUsersData._count.id,
      totalCount,
      userTypePercentages: {
        NEW: `${newUserPercentage}%`,
        RETURNING: `${returningUserPercentage}%`,
      },
      pageViews: newUsersData._sum.pageViews + returningUsersData._sum.pageViews,
      visits: newUsersData._sum.visits + returningUsersData._sum.visits
    };

    res.json(result); // Отправляем данные с метками и процентами

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};
