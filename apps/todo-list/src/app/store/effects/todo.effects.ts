import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  createTodo,
  createTodoError,
  createTodoSuccess,
  deleteTodo,
  deleteTodoError,
  deleteTodoSuccess,
  listTodos,
  listTodosError,
  listTodosSuccess,
  loadTodoDetail,
  loadTodoDetailError,
  loadTodoDetailSuccess,
  markAllAsCompleted,
  markAllAsCompletedError,
  markAllAsCompletedSuccess,
  updateTodo,
  updateTodoError,
  updateTodoSuccess,
} from '../actions/todos.actions';
import {
  catchError,
  filter,
  map,
  of,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs';
import { ApiCallsService } from '../../services/api-calls.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../pages/confirmation-dialog/confirmation-dialog.component';
import { Update } from '@ngrx/entity';
import { TodoResponse } from '../../models/todo.models';
import { Router } from '@angular/router';
import { SnackbarService } from '../../services/snackbar.service';
import { selectTodoList } from '../selectors/todos.selectors';
import { Store } from '@ngrx/store';

@Injectable()
export class TodoEffects {
  // list todos
  listTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(listTodos),
      switchMap(() =>
        this.apiCallsService.listTodos().pipe(
          map((list) => listTodosSuccess({ list })),
          catchError(() => of(listTodosError()))
        )
      )
    )
  );

  listTodosError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(listTodosError),
        tap(() =>
          this.snackbarService.showError(
            'Something went wrong, please try again'
          )
        )
      ),
    { dispatch: false }
  );

  // create todos
  createTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createTodo),
      switchMap((action) =>
        this.apiCallsService.createTodo(action).pipe(
          map((response) => createTodoSuccess(response)),
          catchError(() => of(createTodoError()))
        )
      )
    )
  );

  createTodoSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(createTodoSuccess),
        tap(() =>
          this.snackbarService.showSuccess('Todo successfully created!')
        )
      ),
    { dispatch: false }
  );

  createTodoError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(createTodoError),
        tap(() =>
          this.snackbarService.showError(
            'Something went wrong, please try again!'
          )
        )
      ),
    { dispatch: false }
  );

  // delete todos
  public deleteTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteTodo),
      switchMap((action) =>
        this.matDialog
          .open<ConfirmationDialogComponent, string, boolean>(
            ConfirmationDialogComponent,
            {
              data: 'Are you sure you would like to delete this todo?',
              disableClose: true,
              autoFocus: false,
            }
          )
          .afterClosed()
          .pipe(map((confirmed) => [action.id, confirmed] as [number, boolean]))
      ),
      filter(([_, confirmed]) => confirmed),
      map(([payload, _]) => payload as number),
      switchMap((payload) =>
        this.apiCallsService.deleteTodo(payload).pipe(
          map(() => deleteTodoSuccess({ id: payload })),
          catchError(() => {
            return of(deleteTodoError());
          })
        )
      )
    )
  );

  deleteTodoSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(deleteTodoSuccess),
        tap(() =>
          this.snackbarService.showSuccess('Todo successfully deleted!')
        )
      ),
    { dispatch: false }
  );

  deleteTodoError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(deleteTodoError),
        tap(() =>
          this.snackbarService.showError(
            'Something went wrong, please try again!'
          )
        )
      ),
    { dispatch: false }
  );

  // update todos
  updateTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateTodo),
      switchMap((action) =>
        this.apiCallsService.updateTodo(action).pipe(
          map((response) => {
            const updatedTodo: Update<TodoResponse> = {
              id: response.id,
              changes: {
                ...response,
              },
            };
            return updateTodoSuccess({ todo: updatedTodo });
          }),
          catchError(() => of(createTodoError()))
        )
      )
    )
  );

  updateTodoSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateTodoSuccess),
        tap(() => {
          this.snackbarService.showSuccess('Todo successfully updated!');
          this.router.navigate(['']);
        })
      ),
    { dispatch: false }
  );

  updateTodoError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateTodoError),
        tap(() => {
          this.snackbarService.showError(
            'Something went wrong, please try again!'
          );
        })
      ),
    { dispatch: false }
  );

  // todo detail
  loadTodoDetail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTodoDetail),
      switchMap((action) =>
        this.apiCallsService.getTodoDetail(action.id).pipe(
          map((response) => loadTodoDetailSuccess({ todo: response })),
          catchError(() => of(listTodosError()))
        )
      )
    )
  );

  loadTodoDetailError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loadTodoDetailError),
        tap(() => {
          this.snackbarService.showError(
            'Something went wrong, please try again!'
          );
        })
      ),
    { dispatch: false }
  );

  // mark all as completed
  markAllAsCompleted$ = createEffect(() =>
    this.actions$.pipe(
      ofType(markAllAsCompleted),
      withLatestFrom(this.store.select(selectTodoList)),
      switchMap(([_, todos]) =>
        this.apiCallsService.markAllAsCompleted().pipe(
          map(() => {
            const todoUpdates: Update<TodoResponse>[] = todos.map((todo) => ({
              id: todo.id,
              changes: {
                completed: true,
              },
            }));
            return markAllAsCompletedSuccess({ todos: todoUpdates });
          }),
          catchError(() => of(markAllAsCompletedError()))
        )
      )
    )
  );

  markAllAsCompletedSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(markAllAsCompletedSuccess),
        tap(() => {
          this.snackbarService.showSuccess('Everything is done!');
        })
      ),
    { dispatch: false }
  );

  markAllAsCompletedError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(markAllAsCompletedError),
        tap(() => {
          this.snackbarService.showError(
            'Something went wrong, please try again!'
          );
        })
      ),
    { dispatch: false }
  );

  constructor(
    private apiCallsService: ApiCallsService,
    private actions$: Actions,
    private snackbarService: SnackbarService,
    private matDialog: MatDialog,
    private router: Router,
    private store: Store
  ) {}
}
