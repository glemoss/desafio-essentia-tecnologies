import { Todo } from '../models/todo'
import { TodosRepository } from '../repositories/todos-repository'
import { TodoNotFoundError } from './errors/todo-not-found-error'

interface FetchTodoByIdUseCaseRequest {
  id: string
}

interface FetchTodoByIdUseCaseResponse {
  todo: Todo
}

export class FetchTodoByIdUseCase {
  constructor(private todosRepository: TodosRepository) {}

  async execute({
    id,
  }: FetchTodoByIdUseCaseRequest): Promise<FetchTodoByIdUseCaseResponse> {
    const todo = await this.todosRepository.findById(id)

    if (!todo) {
      throw new TodoNotFoundError()
    }

    return { todo }
  }
}
