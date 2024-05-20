import { Component, inject, OnDestroy, OnInit } from '@angular/core';
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
import { Observable, Subject, takeUntil } from 'rxjs';
import { selectIsCreatingTodo } from '../../store/selectors/todos.selectors';
import { LoaderComponent } from '../loader/loader.component';
import { TodoState } from '../../models/state.models';

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
    LoaderComponent,
  ],
  templateUrl: './create-todo.component.html',
})
export class CreateTodoComponent implements OnInit, OnDestroy {
  private store: Store<TodoState> = inject(Store<TodoState>);
  private actions$ = inject(Actions);
  public isCreatingTodo$: Observable<boolean> = new Observable<boolean>();
  public createForm = new FormControl<string>('');
  private ngDestroy$ = new Subject<void>();

  public ngOnInit() {
    this.isCreatingTodo$ = this.store.pipe(select(selectIsCreatingTodo));
    this.actions$
      .pipe(ofType(createTodoSuccess),takeUntil(this.ngDestroy$))
      .subscribe(() => this.createForm.reset());
  }

  public createTodo() {
    const payload: TodoRequest = {
      completed: false,
      text: this.createForm.value as string,
    };
    if (this.createForm.value) this.store.dispatch(createTodo(payload));
  }

  public ngOnDestroy() {
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
  }
}
