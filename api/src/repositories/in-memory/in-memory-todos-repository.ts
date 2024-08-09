import { randomUUID } from 'node:crypto'

interface Todo {
  id: string
  title: string
  completed: boolean
  created_at: Date
  updated_at: Date
}

export class InMemoryTodoRepository {
  private todos: Todo[] = []

  async create(title: string): Promise<Todo> {
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

  async findById(id: string): Promise<Todo | undefined> {
    return this.todos.find((todo) => todo.id === id)
  }

  async findAll(): Promise<Todo[]> {
    return this.todos
  }

  async update(
    id: string,
    title: string,
    completed: boolean,
  ): Promise<Todo | undefined> {
    const todo = await this.findById(id)

    if (todo) {
      todo.title = title
      todo.completed = completed
      todo.updated_at = new Date()
    }

    return todo
  }

  async delete(id: string): Promise<void> {
    this.todos = this.todos.filter((todo) => todo.id !== id)
  }
}
