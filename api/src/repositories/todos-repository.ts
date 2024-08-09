import { Todo } from '@/models/todo'

export interface TodosRepository {
  create(title: string): Promise<Todo>
  findById(id: string): Promise<Todo | null>
  findAll(): Promise<Todo[]>
  update(id: string, propertiesToUpdate: Partial<Todo>): Promise<Todo | null>
  delete(id: string): Promise<void>
}
