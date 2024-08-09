import { UpdateTodoUseCase } from './update-todo'
import { InMemoryTodosRepository } from '@/repositories/in-memory/in-memory-todos-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { TodoNotFoundError } from './errors/todo-not-found-error'

describe('Update to-o use case', () => {
  let todosRepository: InMemoryTodosRepository
  let sut: UpdateTodoUseCase

  beforeEach(() => {
    todosRepository = new InMemoryTodosRepository()
    sut = new UpdateTodoUseCase(todosRepository)
  })

  it('should update a todo successfully', async () => {
    const createdTodo = await todosRepository.create('Initial Title')

    const propertiesToUpdate = { title: 'Updated Title', completed: true }

    const { todo } = await sut.execute({
      id: createdTodo.id!,
      propertiesToUpdate,
    })

    expect(todo.title).toBe('Updated Title')
    expect(todo.id).toBe(createdTodo.id)
    expect(todo.updated_at).toBeInstanceOf(Date)
    expect(todo.completed).toBeTruthy()
  })

  it('shouldnt be able to update a nonexistent todo', async () => {
    await expect(() =>
      sut.execute({
        id: 'Nonexistent id',
        propertiesToUpdate: { title: 'Updated Title' },
      }),
    ).rejects.toThrowError(TodoNotFoundError)
  })
})
