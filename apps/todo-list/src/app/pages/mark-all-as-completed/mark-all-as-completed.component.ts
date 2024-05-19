import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { select, Store } from '@ngrx/store';
import { markAllAsCompleted } from '../../store/actions/todos.actions';
import { Observable } from 'rxjs';
import { selectIsMarkingAllAsCompleted } from '../../store/selectors/todos.selectors';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-mark-all-as-completed',
  standalone: true,
  imports: [CommonModule, MatButton, MatProgressSpinner],
  templateUrl: './mark-all-as-completed.component.html',
})
export class MarkAllAsCompletedComponent {
  private store = inject(Store);
  public isMarkingAllAsCompleted$: Observable<boolean>;

  constructor() {
    this.isMarkingAllAsCompleted$ = this.store.pipe(
      select(selectIsMarkingAllAsCompleted)
    );
  }

  public markAllAsCompleted() {
    this.store.dispatch(markAllAsCompleted());
  }
}
