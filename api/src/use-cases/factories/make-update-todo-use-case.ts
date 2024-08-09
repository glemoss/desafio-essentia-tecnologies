import { KnexTodosRepository } from '@/repositories/knex/knex-todos-repository'
import { UpdateTodoUseCase } from '../update-todo'

export function makeUpdateTodoUseCase() {
  const todosRepository = new KnexTodosRepository()
  const updateTodoUseCase = new UpdateTodoUseCase(todosRepository)

  return updateTodoUseCase
}
