import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { select, Store } from '@ngrx/store';
import {
  createTodo,
  createTodoSuccess,
} from '../../store/actions/todos.actions';
import { TodoRequest } from '../../models/todo.models';
import { Actions, ofType } from '@ngrx/effects';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
import { selectIsCreatingTodo } from '../../store/selectors/todos.selectors';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-create-todo',
  standalone: true,
  imports: [
    CommonModule,
    MatFormField,
    MatInput,
    ReactiveFormsModule,
    MatLabel,
    MatButton,
    MatProgressSpinner,
  ],
  templateUrl: './create-todo.component.html',
})
export class CreateTodoComponent {
  private store = inject(Store);
  private actions$ = inject(Actions);
  public isCreatingTodo$: Observable<boolean>;
  public createForm = new FormControl();

  constructor() {
    this.isCreatingTodo$ = this.store.pipe(select(selectIsCreatingTodo));
    this.actions$
      .pipe(ofType(createTodoSuccess), takeUntilDestroyed())
      .subscribe(() => this.createForm.reset());
  }

  public createTodo() {
    const payload: TodoRequest = {
      completed: false,
      text: this.createForm.value,
    };
    if (this.createForm.value) this.store.dispatch(createTodo(payload));
  }
}
