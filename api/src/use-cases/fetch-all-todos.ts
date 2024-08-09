import { Todo } from '../models/todo'
import { TodosRepository } from '../repositories/todos-repository'

interface FetchAllTodosUseCaseResponse {
  todos: Todo[]
}

export class FetchAllTodosUseCase {
  constructor(private todosRepository: TodosRepository) {}

  async execute(): Promise<FetchAllTodosUseCaseResponse> {
    const todos = await this.todosRepository.findAll()

    return { todos }
  }
}
