import { Todo } from '@/models/todo'

export interface TodosRepository {
  create(title: string): Promise<Todo>
  findById(id: string): Promise<Todo | null>
  findAll(): Promise<Todo[]>
  update(id: string, todo: Partial<Todo>): Promise<Todo>
  delete(id: string): Promise<void>
}
