import { beforeEach, describe, expect, it } from 'vitest'
import { DeleteTodoUseCase } from './delete-todo'
import { InMemoryTodosRepository } from '@/repositories/in-memory/in-memory-todos-repository'
import { TodoNotFoundError } from './errors/todo-not-found-error'

describe('Delete Todo Use Case', () => {
  let todosRepository: InMemoryTodosRepository
  let sut: DeleteTodoUseCase

  beforeEach(() => {
    todosRepository = new InMemoryTodosRepository()
    sut = new DeleteTodoUseCase(todosRepository)
  })

  it('should be able to delete a todo by its id', async () => {
    const todo = await todosRepository.create('Todo to be deleted')

    const response = await sut.execute({
      id: todo.id!,
    })

    const deletedTodo = await todosRepository.findById(todo.id!)
    expect(response.success).toBe(true)
    expect(deletedTodo).toBeNull()
  })

  it('should throw an error if trying to delete a non-existent todo', async () => {
    await expect(() =>
      sut.execute({
        id: 'nonexistent-id',
      }),
    ).rejects.toThrow(TodoNotFoundError)
  })
})
