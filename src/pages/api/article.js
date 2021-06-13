import { PrismaClient } from '@prisma/client'
import { withSentry } from '@sentry/nextjs'

const prisma = new PrismaClient()

const article = async (req, res) => {
   switch (req.method) {
      case 'POST': {
         const article = await prisma.document.update({
            where: {
               id: req.body.id,
            },
            data: {
               html: req.body.html,
            },
            select: { id: true },
         })

         return res.status(200).json(article)
      }
      case 'GET':
      default: {
         const article = await prisma.document.findUnique({
            where: {
               id: req.query.id,
            },
         })

         return res.status(200).json(article)
      }
   }
}

export default withSentry(article)
