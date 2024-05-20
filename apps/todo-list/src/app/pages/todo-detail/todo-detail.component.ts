import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy, OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TodoResponse } from '../../models/todo.models';
import {
  map,
  Observable,
  Subject,
  take,
  takeUntil,
  tap,
  withLatestFrom,
} from 'rxjs';
import { select, Store } from '@ngrx/store';
import {
  cleanTodoDetail,
  loadTodoDetail,
  updateTodo,
} from '../../store/actions/todos.actions';
import { MatButton } from '@angular/material/button';
import { Params, RouterLink } from '@angular/router';
import {
  selectIsLoadingTodoDetail,
  selectIsUpdatingTodo,
  selectTodoDetail,
} from '../../store/selectors/todos.selectors';
import { selectRouteParams } from '../../store/selectors/router.selectors';
import { MatCheckbox } from '@angular/material/checkbox';
import { LoaderComponent } from '../loader/loader.component';
import { TodoState } from '../../models/state.models';

@Component({
  selector: 'app-todo-detail',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatButton,
    RouterLink,
    MatCheckbox,
    LoaderComponent,
  ],
  templateUrl: './todo-detail.component.html',
})
export class TodoDetailComponent implements OnInit, OnDestroy {
  private store: Store<TodoState> = inject(Store<TodoState>);
  public isUpdatingTodo$: Observable<boolean> = new Observable<boolean>();
  public isLoadingDetail$: Observable<boolean> = new Observable<boolean>();
  private routerParams$: Observable<Params> = new Observable<Params>();
  public updateForm = new FormGroup({
    text: new FormControl<string>(''),
    completed: new FormControl<boolean>(false),
  });

  public updateClick$ = new Subject<void>();
  private ngDestroy$ = new Subject<void>();
  public todo$: Observable<TodoResponse> = new Observable<TodoResponse>();

  public ngOnInit() {
    this.isUpdatingTodo$ = this.store.pipe(select(selectIsUpdatingTodo));
    this.isLoadingDetail$ = this.store.pipe(select(selectIsLoadingTodoDetail));

    this.routerParams$ = this.store.pipe(select(selectRouteParams));
    this.routerParams$
      .pipe(
        take(1),
        tap((params) => {
          this.store.dispatch(loadTodoDetail({ id: params['id'] }));
        })
      )
      .subscribe();

    this.todo$ = this.store.pipe(select(selectTodoDetail));
    this.todo$.pipe(takeUntil(this.ngDestroy$)).subscribe((todo) => {
      this.updateForm.controls.text.setValue(todo.text);
      this.updateForm.controls.completed.setValue(todo.completed);
    });

    this.updateClick$
      .pipe(
        withLatestFrom(this.todo$),
        map(([_, todo]) => ({
          id: todo?.id,
        })),
        tap((updatedTodo) => {
          this.store.dispatch(
            updateTodo({
              id: updatedTodo?.id,
              text: this.updateForm.controls.text.value as string,
              completed: this.updateForm.controls.completed.value as boolean,
            })
          );
        }),
        take(1)
      )
      .subscribe();
  }

  public ngOnDestroy() {
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
    this.store.dispatch(cleanTodoDetail());
  }
}
