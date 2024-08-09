import { Todo } from '@/models/todo'
import { randomUUID } from 'node:crypto'

export class InMemoryTodosRepository {
  private todos: Todo[] = []

  async create(title: string) {
    const todo: Todo = {
      id: randomUUID(),
      title,
      completed: false,
      created_at: new Date(),
      updated_at: new Date(),
    }

    this.todos.push(todo)
    return todo
  }

  async findById(id: string) {
    const todo = this.todos.find((todo) => todo.id === id)

    if (!todo) {
      return null
    }

    return todo
  }

  async findAll() {
    return this.todos
  }

  async update(id: string, propertiesToUpdate: Partial<Todo>): Promise<Todo> {
    let todo = await this.findById(id)

    if (!todo) {
      throw new Error('Todo not found')
    }

    todo = {
      ...todo,
      ...propertiesToUpdate,
      updated_at: new Date(),
    }

    return todo
  }

  async delete(id: string) {
    this.todos = this.todos.filter((todo) => todo.id !== id)
  }
}
