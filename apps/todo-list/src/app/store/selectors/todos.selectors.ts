import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TodoState } from '../../models/state.models';
import { todoListAdapter } from '../reducers/todos.reducer';
import { TodoResponse } from '../../models/todo.models';

export const todoStateFeatureKey = 'todoState';
export const selectTodoState =
  createFeatureSelector<TodoState>(todoStateFeatureKey);

// list
export const selectTodoList = createSelector(
  selectTodoState,
  todoListAdapter.getSelectors().selectAll
);

export const selectIsLoadingList = createSelector(
  selectTodoState,
  (state) => state?.isLoadingTodoList
);

export const selectTodoListError = createSelector(
  selectTodoState,
  (state) => state?.listError
);

export const selectCompletedTodos = createSelector(
  selectTodoState,
  selectTodoList,
  (_, todos: TodoResponse[]) => {
    const completedTodos = todos.filter((todo) => todo.completed);
    return completedTodos?.length;
  }
);

export const selectUnCompletedTodos = createSelector(
  selectTodoState,
  selectTodoList,
  (_, todos: TodoResponse[]) => {
    const unCompletedTodos = todos.filter((todo) => !todo.completed);
    return unCompletedTodos?.length;
  }
);

// todo detail
export const selectTodoDetail = createSelector(
  selectTodoState,
  (state) => state?.todoDetail
);

export const selectIsLoadingTodoDetail = createSelector(
  selectTodoState,
  (state) => state?.isLoadingTodoDetail
);

// create todo
export const selectIsCreatingTodo = createSelector(
  selectTodoState,
  (state) => state?.isCreatingTodo
);

// update todo
export const selectIsUpdatingTodo = createSelector(
  selectTodoState,
  (state) => state?.isUpdatingTodo
);

// mark all as completed
export const selectIsMarkingAllAsCompleted = createSelector(
  selectTodoState,
  (state) => state?.isMarkingAllAsCompleted
);
