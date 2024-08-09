import { expect, describe, it, beforeEach } from 'vitest'
import { FetchTodoByIdUseCase } from './fetch-todo-by-id'
import { InMemoryTodosRepository } from '@/repositories/in-memory/in-memory-todos-repository'
import { TodoNotFoundError } from './errors/todo-not-found-error'

let todosRepository: InMemoryTodosRepository
let sut: FetchTodoByIdUseCase

describe('Fetch to-do by id use case', () => {
  beforeEach(() => {
    todosRepository = new InMemoryTodosRepository()
    sut = new FetchTodoByIdUseCase(todosRepository)
  })

  it('should be able to find a todo by its id', async () => {
    const toBeFoundTodo = await todosRepository.create('To Be Found Todo')
    const { todo } = await sut.execute({
      id: toBeFoundTodo.id!,
    })

    expect(todo.title).to.equal('To Be Found Todo')
    expect(todo.id).toEqual(expect.any(String))
  })

  it('shouldnt be able to find a todo with a nonexistent id', async () => {
    await expect(() =>
      sut.execute({
        id: 'Nonexistent id',
      }),
    ).rejects.to.toThrowError(TodoNotFoundError)
  })
})
