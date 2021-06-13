import { PrismaClient } from '@prisma/client'
import { html } from '../fixtures/article.json'

const prisma = new PrismaClient()

export const seed = async () => {
   const payload = {
      id: 'abc123',
      html,
   }

   const article = await prisma.document.upsert({
      where: {
         id: payload.id,
      },
      update: payload,
      create: payload,
   })

   return { article }
}

export default seed
