import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

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
export class TodoFilterComponent {
  @Output() todoFilter: EventEmitter<string> = new EventEmitter<string>();

  public filterParams: FormControl;

  constructor() {
    this.filterParams = new FormControl('all');

    this.filterParams.valueChanges.pipe().subscribe((filterParams) => {
      this.todoFilter.emit(filterParams);
    });
  }
}
