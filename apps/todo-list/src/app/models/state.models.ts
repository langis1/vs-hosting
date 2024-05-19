import { EntityState } from '@ngrx/entity';
import { TodoResponse } from './todo.models';

export interface TodoState extends EntityState<TodoResponse> {
  todoDetail: TodoResponse;
  isLoadingTodoList: boolean;
  isLoadingTodoDetail: boolean;
  isCreatingTodo: boolean;
  isUpdatingTodo: boolean;
  listError: boolean;
  isMarkingAllAsCompleted: boolean;
}
