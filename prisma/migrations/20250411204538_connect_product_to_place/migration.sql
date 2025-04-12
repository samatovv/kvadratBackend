/*
  Warnings:

  - You are about to drop the column `place` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the `places` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "place",
ADD COLUMN     "placeId" INTEGER NOT NULL DEFAULT 1;

-- DropTable
DROP TABLE "places";

-- CreateTable
CREATE TABLE "Places" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Places_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "Places"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
