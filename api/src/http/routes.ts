import { FastifyInstance } from 'fastify'
import { createTodo } from './controllers/todo.controller'

export async function appRoutes(app: FastifyInstance) {
  app.post('/todos', createTodo)
}
