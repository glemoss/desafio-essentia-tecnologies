import { randomUUID } from 'crypto'
import { TodosRepository } from '../todos-repository'
import { Todo } from '@/models/todo'
import { knex } from '@/database'

export class KnexTodosRepository implements TodosRepository {
  async create(title: string) {
    const todo: Todo = await knex('todos').insert({
      id: randomUUID(),
      title,
      completed: false,
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    })

    return todo
  }

  async findById(id: string) {
    const todo = knex('todos').where({ id }).first()
    return todo
  }

  async findAll() {
    return knex('todos').select('*')
  }

  async update(id: string, propertiesToUpdate: Partial<Todo>) {
    const todo = await this.findById(id)

    await knex<Todo>('todos')
      .where('id', id)
      .update({
        ...propertiesToUpdate,
        updated_at: new Date(),
      })

    const updatedTodo = await knex<Todo>('todos').where('id', id).first()

    return todo ? updatedTodo : todo
  }

  async delete(id: string) {
    await knex('todos').where({ id }).delete()
  }
}
