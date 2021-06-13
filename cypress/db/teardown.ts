import { PrismaClient } from '@prisma/client'

export default async () => {
   const prisma = new PrismaClient()

   const article = await prisma.document.deleteMany({})

   return article
}
