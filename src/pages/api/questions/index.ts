import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '~/lib/prisma'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    return await createQuestion(req, res)
  }

  if (req.method === 'GET') {
    return await getQuestions(req, res)
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    )
  }
}

async function createQuestion(req: NextApiRequest, res: NextApiResponse) {
  const body = JSON.parse(req.body)
  const question = body.question as string

  const ama = await prisma.ama.create({
    data: {
      question,
    },
  })
  res.json(ama)
}

async function getQuestions(req: NextApiRequest, res: NextApiResponse) {
  const { status } = req.query

  if (status === 'ANSWERED' || status === 'UNANSWERED') {
    const questions = await prisma.ama.findMany({
      where: {
        status,
      },
    })
    res.json(questions)
  } else {
    res.status(400)
  }
}