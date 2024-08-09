import { TodosRepository } from '../repositories/todos-repository'
import { TodoNotFoundError } from './errors/todo-not-found-error'

interface DeleteTodoUseCaseRequest {
  id: string
}

interface DeleteTodoUseCaseResponse {
  success: boolean
}

export class DeleteTodoUseCase {
  constructor(private todosRepository: TodosRepository) {}

  async execute({
    id,
  }: DeleteTodoUseCaseRequest): Promise<DeleteTodoUseCaseResponse> {
    const todo = await this.todosRepository.findById(id)

    if (!todo) {
      throw new TodoNotFoundError()
    }
    await this.todosRepository.delete(id)

    return { success: true }
  }
}
