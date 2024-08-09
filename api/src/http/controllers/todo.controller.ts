import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { makeCreateTodoUseCase } from '@/use-cases/factories/make-todo-use-case'

export async function createTodo(request: FastifyRequest, reply: FastifyReply) {
  const createTodoBodySchema = z.object({
    title: z.string().min(5),
  })

  const { title } = createTodoBodySchema.parse(request.body)

  try {
    const createTodoUseCase = makeCreateTodoUseCase()

    await createTodoUseCase.execute({
      title,
    })
  } catch (err) {
    if (err) {
      return reply.status(500).send({ message: err })
    }
    throw err
  }

  return reply.status(201).send()
}
