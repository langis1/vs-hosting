import { Route } from '@angular/router';
import { TodoListComponent } from './pages/todo-list/todo-list.component';
import { TodoDetailComponent } from './pages/todo-detail/todo-detail.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: TodoListComponent,
  },
  {
    path: ':id',
    component: TodoDetailComponent,
  },
];
