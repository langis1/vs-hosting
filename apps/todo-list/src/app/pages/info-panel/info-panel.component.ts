import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import {
  selectCompletedTodos,
  selectUnCompletedTodos,
} from '../../store/selectors/todos.selectors';
import { TodoState } from '../../models/state.models';

@Component({
  selector: 'app-info-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './info-panel.component.html',
})
export class InfoPanelComponent implements OnInit {
  private store: Store<TodoState> = inject(Store<TodoState>);

  public completedTodos$: Observable<number> = new Observable<number>();
  public unCompletedTodos$: Observable<number> = new Observable<number>();

  public ngOnInit() {
    this.completedTodos$ = this.store.pipe(select(selectCompletedTodos));
    this.unCompletedTodos$ = this.store.pipe(select(selectUnCompletedTodos));
  }
}
