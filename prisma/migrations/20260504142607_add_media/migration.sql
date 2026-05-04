-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "mediaUrls" TEXT[] DEFAULT ARRAY[]::TEXT[];
