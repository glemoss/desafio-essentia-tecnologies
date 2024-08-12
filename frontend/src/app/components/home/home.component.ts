import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../interfaces/todo';

const apiUrl = 'http://localhost:3333';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styles: [
    `
      ::-webkit-scrollbar {
        display: none;
      }
    `,
  ],
})
export class HomeComponent implements OnInit {
  private todoService = inject(TodoService);

  todoItems: Todo[] = [];
  selectedTodo?: Todo;

  createTodoForm = new FormGroup({
    title: new FormControl(''),
  });

  editTodoForm = new FormGroup({
    title: new FormControl(''),
    completed: new FormControl(false),
  });

  ngOnInit() {
    this.loadTodos();
  }

  async loadTodos() {
    try {
      const response = await this.todoService.getTodos();
      if (response?.data) {
        this.todoItems = response.data;
      }
    } catch (error) {
      console.error('Error loading todos', error);
      alert('Error loading todos');
    }
  }
  

  async createTodo() {
    const title = this.createTodoForm.value.title?.trim();
    if (!title) return;
  
    try {
      const response = await this.todoService.createTodo({ title });
  
      if (response && response.data) {
        this.todoItems.unshift(response.data);
        this.createTodoForm.reset();
      }
    } catch (error) {
      console.error('Error creating todo', error);
      alert('Error creating todo');
    }
  }
  
  
  
  

  selectTodoForEditing(todo: Todo) {
    this.selectedTodo = todo;
    this.editTodoForm.patchValue({
      title: todo.title,
      completed: todo.completed ?? false,
    });
  }
  

  async updateTodo() {
    if (!this.selectedTodo) return;
  
    const updatedValues = this.editTodoForm.value;
    try {
      const response = await this.todoService.updateTodo(this.selectedTodo.id, {
        title: updatedValues.title || '',
        completed: updatedValues.completed || false,
      });
  
      if (response?.data) {
        const index = this.todoItems.findIndex((t) => t.id === response.data.id);
        if (index !== -1) {
          this.todoItems[index] = response.data;
        }
        this.selectedTodo = undefined;
        this.editTodoForm.reset();
      }
    } catch (error) {
      console.error('Error updating todo', error);
      alert('Error updating todo');
    }
  }
  

  async deleteTodoById(id: string) {
    try {
      await this.todoService.deleteTodo(id);
      this.todoItems = this.todoItems.filter((todo) => todo.id !== id);
    } catch (error) {
      console.error('Error deleting todo', error);
      alert('Error deleting todo');
    }
  }

  toggleTodoCompletion(todo: Todo) {
    todo.completed = !todo.completed;
    this.updateTodo();
  }

  cancelEditing() {
    this.selectedTodo = undefined;
    this.editTodoForm.reset();
  }
}
