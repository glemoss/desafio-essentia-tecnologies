import { FastifyInstance } from 'fastify'
import {
  createTodo,
  fetchAllTodos,
  updateTodo,
} from './controllers/todo.controller'

export async function appRoutes(app: FastifyInstance) {
  app.post('/todos', createTodo)

  app.get('/todos', fetchAllTodos)

  app.put('/todos/:id', updateTodo)
}
