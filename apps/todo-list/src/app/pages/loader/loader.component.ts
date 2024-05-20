import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule, MatProgressSpinner],
  templateUrl: './loader.component.html',
})
export class LoaderComponent {
  @Input() public diameter = 100
}
