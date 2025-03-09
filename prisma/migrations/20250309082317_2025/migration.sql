-- CreateEnum
CREATE TYPE "ItemType" AS ENUM ('BEADS', 'PENDANTS', 'DROPS', 'LINKS');

-- CreateEnum
CREATE TYPE "ChainColor" AS ENUM ('GOLD', 'ANTIQUE_GOLD', 'SILVER', 'ANTIQUE_SILVER', 'GOLD_MATTE');

-- CreateTable
CREATE TABLE "Item" (
    "id" TEXT NOT NULL,
    "type" "ItemType" NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "image" TEXT,
    "price" DECIMAL(65,30),
    "stock" TEXT,
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
    "type" "ItemType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Jewelry" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "description" TEXT,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "shareLink" TEXT,
    "chainColor" "ChainColor" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Jewelry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JewelryPosition" (
    "id" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "itemId" TEXT,
    "pendantId" TEXT,
    "jewelryId" TEXT NOT NULL,
    "designId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "rotation" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "JewelryPosition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JewelryDesign" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "chainColor" "ChainColor" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "JewelryDesign_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "JewelryPosition_position_key" ON "JewelryPosition"("position");

-- CreateIndex
CREATE UNIQUE INDEX "JewelryPosition_itemId_key" ON "JewelryPosition"("itemId");

-- CreateIndex
CREATE UNIQUE INDEX "JewelryPosition_pendantId_key" ON "JewelryPosition"("pendantId");

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JewelryPosition" ADD CONSTRAINT "JewelryPosition_designId_fkey" FOREIGN KEY ("designId") REFERENCES "JewelryDesign"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JewelryPosition" ADD CONSTRAINT "JewelryPosition_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JewelryPosition" ADD CONSTRAINT "JewelryPosition_jewelryId_fkey" FOREIGN KEY ("jewelryId") REFERENCES "Jewelry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
