import { expect, describe, it, beforeEach } from 'vitest'
import { CreateTodoUseCase } from './create-todo'
import { InMemoryTodosRepository } from '@/repositories/in-memory/in-memory-todos-repository'

let todosRepository: InMemoryTodosRepository
let sut: CreateTodoUseCase

describe('Create to-do use case', () => {
  beforeEach(() => {
    todosRepository = new InMemoryTodosRepository()
    sut = new CreateTodoUseCase(todosRepository)
  })

  it('should be able to create a new todo', async () => {
    const { todo } = await sut.execute({
      title: 'Test Todo',
    })

    expect(todo.title).to.equal('Test Todo')
    expect(todo.id).toEqual(expect.any(String))
  })
})
