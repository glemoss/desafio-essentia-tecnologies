import { KnexTodosRepository } from '@/repositories/knex/knex-todos-repository'
import { DeleteTodoUseCase } from '../delete-todo'

export function makeDeleteTodoUseCase() {
  const todosRepository = new KnexTodosRepository()
  const deleteTodoUseCase = new DeleteTodoUseCase(todosRepository)

  return deleteTodoUseCase
}
