import { Prisma, PrismaClient } from '@/generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })

export const prisma = new PrismaClient({ adapter })

type AdminType = Prisma.AdminGetPayload<null>

type ProductType = Prisma.ProductGetPayload<{
	include: {
		tags: true
	}
}>

type TagType = Prisma.TagGetPayload<{
	include: {
		products: true
	}
}>

export type { AdminType, ProductType, TagType }

export default prisma