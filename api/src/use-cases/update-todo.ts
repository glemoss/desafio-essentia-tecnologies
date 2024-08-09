import { Todo } from '../models/todo'
import { TodosRepository } from '../repositories/todos-repository'
import { TodoNotFoundError } from './errors/todo-not-found-error'

interface UpdateTodoUseCaseRequest {
  id: string
  propertiesToUpdate: Partial<Omit<Todo, 'id' | 'created_at' | 'updated_at'>>
}

interface UpdateTodoUseCaseResponse {
  todo: Todo
}

export class UpdateTodoUseCase {
  constructor(private todosRepository: TodosRepository) {}

  async execute({
    id,
    propertiesToUpdate,
  }: UpdateTodoUseCaseRequest): Promise<UpdateTodoUseCaseResponse> {
    const todo = await this.todosRepository.findById(id)

    if (!todo) {
      throw new TodoNotFoundError()
    }
    const updatedTodo = await this.todosRepository.update(
      id,
      propertiesToUpdate,
    )

    if (!updatedTodo) {
      throw new TodoNotFoundError()
    }

    return { todo: updatedTodo }
  }
}
