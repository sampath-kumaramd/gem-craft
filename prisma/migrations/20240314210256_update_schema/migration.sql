/*
  Warnings:

  - You are about to drop the column `gemId` on the `JewelryPosition` table. All the data in the column will be lost.
  - You are about to drop the `Gem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GemCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Pendant` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PendantCategory` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[itemId]` on the table `JewelryPosition` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "ItemType" AS ENUM ('GEM', 'PENDANT');

-- DropForeignKey
ALTER TABLE "Gem" DROP CONSTRAINT "Gem_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "JewelryPosition" DROP CONSTRAINT "JewelryPosition_gemId_fkey";

-- DropForeignKey
ALTER TABLE "JewelryPosition" DROP CONSTRAINT "JewelryPosition_pendantId_fkey";

-- DropForeignKey
ALTER TABLE "Pendant" DROP CONSTRAINT "Pendant_categoryId_fkey";

-- DropIndex
DROP INDEX "JewelryPosition_gemId_key";

-- AlterTable
ALTER TABLE "JewelryPosition" DROP COLUMN "gemId",
ADD COLUMN     "itemId" TEXT;

-- DropTable
DROP TABLE "Gem";

-- DropTable
DROP TABLE "GemCategory";

-- DropTable
DROP TABLE "Pendant";

-- DropTable
DROP TABLE "PendantCategory";

-- CreateTable
CREATE TABLE "Item" (
    "id" TEXT NOT NULL,
    "type" "ItemType" NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "image" TEXT,
    "price" DECIMAL(65,30),
    "stock" INTEGER,
    "material" TEXT[],
    "natural" BOOLEAN NOT NULL,
    "shape" TEXT NOT NULL,
    "texture" TEXT NOT NULL,
    "colors" TEXT[],
    "weight" DECIMAL(65,30),
    "quantity" INTEGER,
    "active" BOOLEAN,
    "dimensions" TEXT,
    "categoryId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "JewelryPosition_itemId_key" ON "JewelryPosition"("itemId");

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JewelryPosition" ADD CONSTRAINT "JewelryPosition_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE SET NULL ON UPDATE CASCADE;
