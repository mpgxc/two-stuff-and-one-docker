/*
  Warnings:

  - The primary key for the `purchases` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `purchases` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[customer_id,product_id]` on the table `purchases` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "purchases" DROP CONSTRAINT "purchases_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "purchases_pkey" PRIMARY KEY ("customer_id", "product_id");

-- CreateIndex
CREATE UNIQUE INDEX "purchases_customer_id_product_id_key" ON "purchases"("customer_id", "product_id");
