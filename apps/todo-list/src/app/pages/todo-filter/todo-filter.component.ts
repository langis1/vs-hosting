import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TodoStatus } from '../../models/todo.models';

@Component({
  selector: 'app-todo-filter',
  standalone: true,
  imports: [
    CommonModule,
    MatRadioButton,
    MatRadioGroup,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './todo-filter.component.html',
})
export class TodoFilterComponent implements OnInit {
  @Output() todoFilter: EventEmitter<string> = new EventEmitter<string>();
  public filterParamsForm = new FormControl<string>(TodoStatus.ALL);

  public ngOnInit() {
    this.filterParamsForm.valueChanges.pipe().subscribe((filterParams) => {
      this.todoFilter.emit(filterParams as string);
    });
  }

  protected readonly TodoStatus = TodoStatus;
}
