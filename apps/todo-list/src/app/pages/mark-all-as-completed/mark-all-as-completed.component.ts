import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { select, Store } from '@ngrx/store';
import { markAllAsCompleted } from '../../store/actions/todos.actions';
import { Observable } from 'rxjs';
import { selectIsMarkingAllAsCompleted } from '../../store/selectors/todos.selectors';
import { LoaderComponent } from '../loader/loader.component';
import { TodoState } from '../../models/state.models';

@Component({
  selector: 'app-mark-all-as-completed',
  standalone: true,
  imports: [CommonModule, MatButton, LoaderComponent],
  templateUrl: './mark-all-as-completed.component.html',
})
export class MarkAllAsCompletedComponent implements OnInit {
  private store: Store<TodoState> = inject(Store<TodoState>);
  public isMarkingAllAsCompleted$: Observable<boolean> = new Observable<boolean>();

  public ngOnInit() {
    this.isMarkingAllAsCompleted$ = this.store.pipe(
      select(selectIsMarkingAllAsCompleted)
    );
  }

  public markAllAsCompleted() {
    this.store.dispatch(markAllAsCompleted());
  }
}
