import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateTodoComponent } from '../create-todo/create-todo.component';
import { LoaderComponent } from '../loader/loader.component';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { TodoResponse } from '../../models/todo.models';
import { select, Store } from '@ngrx/store';
import { listTodos } from '../../store/actions/todos.actions';
import {
  selectIsLoadingList,
  selectTodoList,
  selectTodoListError,
} from '../../store/selectors/todos.selectors';
import { InfoPanelComponent } from '../info-panel/info-panel.component';
import { TodoFilterComponent } from '../todo-filter/todo-filter.component';
import { MatButton } from '@angular/material/button';
import { MarkAllAsCompletedComponent } from '../mark-all-as-completed/mark-all-as-completed.component';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [
    CommonModule,
    CreateTodoComponent,
    LoaderComponent,
    TodoItemComponent,
    InfoPanelComponent,
    TodoFilterComponent,
    MatButton,
    MarkAllAsCompletedComponent,
  ],
  templateUrl: './todo-list.component.html',
})
export class TodoListComponent {
  private store = inject(Store);
  public todoList$: Observable<TodoResponse[]>;
  public isLoadingList$: Observable<boolean>;
  public filteredTodoList$: Observable<TodoResponse[]>;
  public todoFilter$ = new BehaviorSubject<string>('all');
  public todoListError$: Observable<boolean>;

  constructor() {
    this.fetchData();
    this.todoList$ = this.store.pipe(select(selectTodoList));
    this.todoListError$ = this.store.pipe(select(selectTodoListError));
    this.isLoadingList$ = this.store.pipe(select(selectIsLoadingList));

    this.filteredTodoList$ = combineLatest([
      this.todoList$,
      this.todoFilter$,
    ]).pipe(
      map(([todos, filter]) => {
        if (filter === 'all') {
          return todos.sort(
            (a, b) => Number(a.completed) - Number(b.completed)
          );
        } else if (filter === 'completed') {
          return todos.filter((todo) => todo.completed);
        } else if (filter === 'uncompleted') {
          return todos.filter((todo) => !todo.completed);
        } else return [] as TodoResponse[];
      })
    );
  }

  public fetchData() {
    this.store.dispatch(listTodos());
  }
}
