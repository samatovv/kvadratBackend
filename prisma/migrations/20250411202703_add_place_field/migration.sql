-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "place" TEXT NOT NULL DEFAULT 'Не указано';

-- CreateTable
CREATE TABLE "places" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "places_pkey" PRIMARY KEY ("id")
);
