-- CreateTable
CREATE TABLE "Gem" (
    "id" TEXT NOT NULL,
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

    CONSTRAINT "Gem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GemCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GemCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pendant" (
    "id" TEXT NOT NULL,
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

    CONSTRAINT "Pendant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PendantCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PendantCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Jewelry" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "description" TEXT,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "shareLink" TEXT,
    "chainColor" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Jewelry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JewelryPosition" (
    "id" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "gemId" TEXT,
    "pendantId" TEXT,
    "jewelryId" TEXT NOT NULL,
    "designId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "JewelryPosition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JewelryDesign" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "chainColor" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "JewelryDesign_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GemCategory_name_key" ON "GemCategory"("name");

-- CreateIndex
CREATE UNIQUE INDEX "PendantCategory_name_key" ON "PendantCategory"("name");

-- CreateIndex
CREATE UNIQUE INDEX "JewelryPosition_position_key" ON "JewelryPosition"("position");

-- CreateIndex
CREATE UNIQUE INDEX "JewelryPosition_gemId_key" ON "JewelryPosition"("gemId");

-- CreateIndex
CREATE UNIQUE INDEX "JewelryPosition_pendantId_key" ON "JewelryPosition"("pendantId");

-- AddForeignKey
ALTER TABLE "Gem" ADD CONSTRAINT "Gem_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "GemCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pendant" ADD CONSTRAINT "Pendant_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "PendantCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JewelryPosition" ADD CONSTRAINT "JewelryPosition_designId_fkey" FOREIGN KEY ("designId") REFERENCES "JewelryDesign"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JewelryPosition" ADD CONSTRAINT "JewelryPosition_gemId_fkey" FOREIGN KEY ("gemId") REFERENCES "Gem"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JewelryPosition" ADD CONSTRAINT "JewelryPosition_jewelryId_fkey" FOREIGN KEY ("jewelryId") REFERENCES "Jewelry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JewelryPosition" ADD CONSTRAINT "JewelryPosition_pendantId_fkey" FOREIGN KEY ("pendantId") REFERENCES "Pendant"("id") ON DELETE SET NULL ON UPDATE CASCADE;
