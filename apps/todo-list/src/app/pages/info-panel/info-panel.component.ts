import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import {
  selectCompletedTodos,
  selectUnCompletedTodos,
} from '../../store/selectors/todos.selectors';

@Component({
  selector: 'app-info-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './info-panel.component.html',
})
export class InfoPanelComponent {
  private store = inject(Store);

  public completedTodos$!: Observable<number>;
  public unCompletedTodos$!: Observable<number>;

  constructor() {
    this.completedTodos$ = this.store.pipe(select(selectCompletedTodos));
    this.unCompletedTodos$ = this.store.pipe(select(selectUnCompletedTodos));
  }
}
