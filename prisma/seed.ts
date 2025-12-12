import { PrismaClient } from '@prisma/client'
import 'dotenv/config'
import fs from 'fs'

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set in environment variables')
}

const prisma = new PrismaClient()

async function main() {
  const data = JSON.parse(fs.readFileSync('prisma/data/questions.json', 'utf8'))

  for (const q of data) {
    // Verify if the question already exists
    const existingQuestion = await prisma.question.findFirst({
      where: { text: q.text }
    })

    if (existingQuestion) {
      console.log('skipped (already exists):', q.text.substring(0, 50) + '...')
      continue
    }

    const tagIds: string[] = []
    if (q.tags && Array.isArray(q.tags)) {
      for (const tagName of q.tags) {
        const tag = await prisma.tag.upsert({
          where: { name: tagName },
          update: {},
          create: { name: tagName }
        })
        tagIds.push(tag.id)
      }
    }

    const created = await prisma.question.create({
      data: {
        text: q.text,
        category: q.category,
        difficulty: q.difficulty,
        source: q.source,
        options: { create: q.options },
        tagIds
      }
    })
    console.log('created:', created.id, '-', q.text.substring(0, 50) + '...')
  }
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => prisma.$disconnect())
