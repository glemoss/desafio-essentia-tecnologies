import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { ValidationError } from '../errors/validation-error';
import { CreateTodo, Todo, UpdateTodo } from '../interfaces/todo';


const apiUrl = environment.apiUrl;

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
      });
      const { data, message, details } = (await response.json()) as any;
      if (!response.ok) {
        return {
          error: message ?? 'Error creating todo',
          details: details as ValidationError[],
        };
      }
      return {
        message: message as string,
        data: data as Todo,
      };
    } catch (error) {
      console.error(error);
      return {
        error: 'Error creating todo',
      };
    }
  }

  async getTodos() {
    try {
      const response = await fetch(`${apiUrl}/todos/`);
      const json = (await response.json()) as any;
      const { data, message } = json;
      if (!response.ok) {
        return {
          error: message as string,
        };
      }
      return {
        message: message as string,
        data: data as Todo[],
      };
    } catch (error) {
      console.error(error);
      return {
        error: 'Error getting todos',
      };
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
      });
      const json = (await response.json()) as any;
      const { data, message, details } = json;
      if (!response.ok) {
        return {
          error: message as string,
          details: details as ValidationError[],
        };
      }
      return {
        message: message as string,
        data: data as Todo,
      };
    } catch (error) {
      console.error(error);
      return {
        error: 'Error updating todo',
      };
    }
  }

  async deleteTodo(id: string) {
    try {
      const response = await fetch(`${apiUrl}/todos/${id}`, {
        method: 'DELETE',
      });
      const { message } = (await response.json()) as any;
      if (!response.ok) {
        return {
          error: message as string,
        };
      }
      return {
        message: message as string,
      };
    } catch (error) {
      console.error(error);
      return {
        error: 'Error deleting todo',
      };
    }
  }
}