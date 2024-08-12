import { Injectable } from '@angular/core'
import { ValidationError } from '../errors/validation-error'
import { CreateTodo, Todo, UpdateTodo } from '../interfaces/todo'


const apiUrl = 'http://localhost:3333'

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  async createTodo(todo: CreateTodo) {
    try {
      const response = await fetch(`${apiUrl}/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
      })
      const data = await response.json()
      return {
        data: data as Todo,
      }
    } catch (error) {
      console.error(error)
      return
    }
  }

  async getTodos() {
    try {
      const response = await fetch(`${apiUrl}/todos`)
      const json = await response.json()

      return {
        data: json as Todo[],
      }
    } catch (error) {
      console.error(error)
      return
    }
  }

  async updateTodo(id: string, todo: UpdateTodo) {
    try {
      const response = await fetch(`${apiUrl}/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
      })
      const json = (await response.json()) as any
      const { data, message, details } = json
      if (!response.ok) {
        return {
          error: message as string,
          details: details as ValidationError[],
        }
      }
      return {
        message: message as string,
        data: data as Todo,
      }
    } catch (error) {
      console.error(error)
      return
    }
  }

  async deleteTodo(id: string) {
    try {
      const response = await fetch(`${apiUrl}/todos/${id}`, {
        method: 'DELETE',
      })
      
      return 'Todo deleted'
    } catch (error) {
      console.error(error)
      return
    }
  }
}