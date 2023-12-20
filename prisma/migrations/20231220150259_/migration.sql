/*
  Warnings:

  - You are about to drop the column `image` on the `clothes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "clothes" DROP COLUMN "image",
ADD COLUMN     "images" TEXT[];
