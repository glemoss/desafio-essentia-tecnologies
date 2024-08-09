import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { makeCreateTodoUseCase } from '@/use-cases/factories/make-todo-use-case'
import { makeFetchAllTodosUseCase } from '@/use-cases/factories/make-fetch-all-todos-use-case'

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

export async function fetchAllTodos(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const fetchAllTodosUseCase = makeFetchAllTodosUseCase()

    const { todos } = await fetchAllTodosUseCase.execute()

    return reply.send(todos)
  } catch (err) {
    if (err) {
      return reply.status(500).send({ message: err })
    }
    throw err
  }
}
