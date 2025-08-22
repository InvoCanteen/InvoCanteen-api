/*
  Warnings:

  - You are about to drop the column `cashierId` on the `Cart` table. All the data in the column will be lost.
  - You are about to drop the column `cashierId` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the `Cashier` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "public"."UserRole" AS ENUM ('ADMIN', 'CASHIER');

-- DropForeignKey
ALTER TABLE "public"."Cart" DROP CONSTRAINT "Cart_cashierId_fkey";

-- DropForeignKey
ALTER TABLE "public"."orders" DROP CONSTRAINT "orders_cashierId_fkey";

-- DropIndex
DROP INDEX "public"."Cart_cashierId_idx";

-- DropIndex
DROP INDEX "public"."orders_cashierId_idx";

-- AlterTable
ALTER TABLE "public"."Cart" DROP COLUMN "cashierId",
ADD COLUMN     "userId" INTEGER;

-- AlterTable
ALTER TABLE "public"."orders" DROP COLUMN "cashierId",
ADD COLUMN     "userId" INTEGER;

-- DropTable
DROP TABLE "public"."Cashier";

-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "photoProfile" TEXT,
    "role" "public"."UserRole" NOT NULL DEFAULT 'CASHIER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE INDEX "Cart_userId_idx" ON "public"."Cart"("userId");

-- CreateIndex
CREATE INDEX "orders_userId_idx" ON "public"."orders"("userId");

-- AddForeignKey
ALTER TABLE "public"."Cart" ADD CONSTRAINT "Cart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."orders" ADD CONSTRAINT "orders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
