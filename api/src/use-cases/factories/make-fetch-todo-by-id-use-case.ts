import { KnexTodosRepository } from '@/repositories/knex/knex-todos-repository'
import { FetchTodoByIdUseCase } from '../fetch-todo-by-id'

export function makeFetchTodoByIdUseCase() {
  const todosRepository = new KnexTodosRepository()
  const fetchTodoByIdUseCase = new FetchTodoByIdUseCase(todosRepository)

  return fetchTodoByIdUseCase
}
