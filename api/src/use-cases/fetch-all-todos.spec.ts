import { expect, describe, it, beforeEach } from 'vitest'
import { FetchAllTodosUseCase } from './fetch-all-todos'
import { InMemoryTodosRepository } from '@/repositories/in-memory/in-memory-todos-repository'

let todosRepository: InMemoryTodosRepository
let sut: FetchAllTodosUseCase

describe('Fetch all to-dos use case', () => {
  beforeEach(() => {
    todosRepository = new InMemoryTodosRepository()
    sut = new FetchAllTodosUseCase(todosRepository)
  })

  it('should be able to find all todos', async () => {
    await todosRepository.create('To-do 1')
    await todosRepository.create('To-do 2')
    await todosRepository.create('To-do 3')
    await todosRepository.create('To-do 4')

    const { todos } = await sut.execute()

    expect(todos).toHaveLength(4)
    expect(todos).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ title: 'To-do 1' }),
        expect.objectContaining({ title: 'To-do 2' }),
        expect.objectContaining({ title: 'To-do 3' }),
        expect.objectContaining({ title: 'To-do 4' }),
      ]),
    )
  })

  it('should return an empty array when there are no todos', async () => {
    const { todos } = await sut.execute()
    expect(todos).toHaveLength(0)
  })
})
