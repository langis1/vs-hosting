import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoResponse } from '../../models/todo.models';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { deleteTodo } from '../../store/actions/todos.actions';
import { RouterLink } from '@angular/router';
import { TodoState } from '../../models/state.models';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [
    CommonModule,
    MatMenuTrigger,
    MatButton,
    MatIconButton,
    MatIcon,
    MatMenu,
    MatMenuItem,
    RouterLink,
  ],
  templateUrl: './todo-item.component.html',
})
export class TodoItemComponent {
  private store: Store<TodoState> = inject(Store<TodoState>);
  @Input({ required: true }) public todoItem!: TodoResponse;

  public deleteTodo(id: number) {
    this.store.dispatch(deleteTodo({ id }));
  }
}
