import { createAction, props } from '@ngrx/store';
import { TodoRequest, TodoResponse } from '../../models/todo.models';
import { Update } from '@ngrx/entity';

// list todos
export const listTodos = createAction('[Todo List Component] List Todos');

export const listTodosSuccess = createAction(
  '[Todo List Component] List Todos Success',
  props<{ list: TodoResponse[] }>()
);

export const listTodosError = createAction(
  '[Todo List Component] List Todos Error'
);

// create todo
export const createTodo = createAction(
  '[Create Todo Component] Create Todo',
  props<TodoRequest>()
);

export const createTodoSuccess = createAction(
  '[Create Todo Component] Create Todo Success',
  props<TodoResponse>()
);

export const createTodoError = createAction(
  '[Create Todo Component] Create Todo Error'
);

// delete todo
export const deleteTodo = createAction(
  '[Todo Item Component] Delete Todo',
  props<{ id: number }>()
);

export const deleteTodoSuccess = createAction(
  '[Todo Item Component] Delete Todo Success',
  props<{ id: number }>()
);

export const deleteTodoError = createAction(
  '[Todo Item Component] Delete Todo Error'
);

// update todo
export const updateTodo = createAction(
  '[Todo Detail Component] Update Todo',
  props<TodoRequest>()
);

export const updateTodoSuccess = createAction(
  '[Todo Detail Component] Update Todo Success',
  props<{ todo: Update<TodoResponse> }>()
);

export const updateTodoError = createAction(
  '[Todo Detail Component] Update Todo Error'
);

//todo detail
export const loadTodoDetail = createAction(
  '[Todo Detail Component] Load Todo Detail',
  props<{ id: number }>()
);
export const loadTodoDetailSuccess = createAction(
  '[Todo Detail Component] Load Todo Detail Success',
  props<{
    todo: TodoResponse;
  }>()
);
export const loadTodoDetailError = createAction(
  '[Todo Detail Component] Load Todo Detail error'
);
export const cleanTodoDetail = createAction(
  '[Todo Detail Component ] Clean Todo Detail'
);

//mark all as completed
export const markAllAsCompleted = createAction(
  '[Todo List Component] Mark All As Completed'
);
export const markAllAsCompletedSuccess = createAction(
  '[Todo List Component] Mark All As Completed Success',
  props<{ todos: Update<TodoResponse>[] }>()
);
export const markAllAsCompletedError = createAction(
  '[Todo List Component] Mark All As Completed Error'
);
