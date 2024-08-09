import { KnexTodosRepository } from '@/repositories/knex/knex-todos-repository'
import { FetchAllTodosUseCase } from '../fetch-all-todos'

export function makeFetchAllTodosUseCase() {
  const todosRepository = new KnexTodosRepository()
  const fetchAllTodosUseCase = new FetchAllTodosUseCase(todosRepository)

  return fetchAllTodosUseCase
}
