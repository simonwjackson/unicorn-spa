import { PrismaClient } from '@prisma/client'
import { seed } from '../cypress/db/seed'

const prisma = new PrismaClient()

async function main() {
   await seed()
   process.exit(0)
}

main()
   .catch((e) => {
      console.error(e)
      process.exit(1)
   })
   .finally(async () => {
      await prisma.$disconnect()
   })
