import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { makeCreateTodoUseCase } from '@/use-cases/factories/make-todo-use-case'
import { makeFetchAllTodosUseCase } from '@/use-cases/factories/make-fetch-all-todos-use-case'
import { TodoNotFoundError } from '@/use-cases/errors/todo-not-found-error'
import { makeUpdateTodoUseCase } from '@/use-cases/factories/make-update-todo-use-case'
import { Todo } from '@/models/todo'

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

export async function updateTodo(
  request: FastifyRequest<{ Params: { id: string }; Body: Partial<Todo> }>,
  reply: FastifyReply,
) {
  const { id } = request.params
  const propertiesToUpdate = request.body

  try {
    const updateTodoUseCase = makeUpdateTodoUseCase()

    const { todo } = await updateTodoUseCase.execute({
      id,
      propertiesToUpdate,
    })

    return reply.status(200).send(todo)
  } catch (error) {
    if (error instanceof TodoNotFoundError) {
      return reply.status(404).send({ message: 'Todo not found' })
    }

    return reply.status(500).send({ message: 'Internal server error' })
  }
}
