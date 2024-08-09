import { Todo } from '../models/todo'
import { TodosRepository } from '../repositories/todos-repository'

interface CreateTodoUseCaseRequest {
  title: string
}

interface CreateTodoUseCaseResponse {
  todo: Todo
}

export class CreateTodoUseCase {
  constructor(private todosRepository: TodosRepository) {}

  async execute({
    title,
  }: CreateTodoUseCaseRequest): Promise<CreateTodoUseCaseResponse> {
    const todo = await this.todosRepository.create(title)
    return { todo }
  }
}
