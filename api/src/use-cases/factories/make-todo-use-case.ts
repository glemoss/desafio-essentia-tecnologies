import { KnexTodosRepository } from '@/repositories/knex/knex-todos-repository'
import { CreateTodoUseCase } from '../create-todo'

export function makeCreateTodoUseCase() {
  const todosRepository = new KnexTodosRepository()
  const createTodoUseCase = new CreateTodoUseCase(todosRepository)

  return createTodoUseCase
}
