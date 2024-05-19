import { TodoResponse } from '../../models/todo.models';
import { createReducer, on } from '@ngrx/store';
import {
  cleanTodoDetail,
  createTodo,
  createTodoError,
  createTodoSuccess,
  deleteTodoSuccess,
  listTodos,
  listTodosError,
  listTodosSuccess,
  loadTodoDetail,
  loadTodoDetailError,
  loadTodoDetailSuccess,
  markAllAsCompleted,
  markAllAsCompletedError,
  markAllAsCompletedSuccess,
  updateTodo,
  updateTodoError,
  updateTodoSuccess,
} from '../actions/todos.actions';
import { createEntityAdapter } from '@ngrx/entity';
import { TodoState } from '../../models/state.models';

export const todoListAdapter = createEntityAdapter<TodoResponse>();

export const initialState: TodoState = todoListAdapter.getInitialState({
  todoDetail: {} as TodoResponse,
  isLoadingTodoList: false,
  isLoadingTodoDetail: false,
  isCreatingTodo: false,
  isUpdatingTodo: false,
  listError: false,
  isMarkingAllAsCompleted: false,
});

export const todosReducer = createReducer(
  initialState,

  // list todos
  on(listTodos, (state) => ({
    ...state,
    isLoadingTodoList: true,
    listError: false,
  })),
  on(listTodosSuccess, (state, action) => {
    return todoListAdapter.addMany(action.list, {
      ...state,
      isLoadingTodoList: false,
    });
  }),
  on(listTodosError, (state) => ({
    ...state,
    isLoadingTodoList: false,
    listError: true,
  })),

  // create todo
  on(createTodo, (state) => ({ ...state, isCreatingTodo: true })),
  on(createTodoSuccess, (state, action) => {
    return todoListAdapter.addOne(action, { ...state, isCreatingTodo: false });
  }),
  on(createTodoError, (state) => ({ ...state, isCreatingTodo: false })),

  // delete todo
  on(deleteTodoSuccess, (state, { id }) => {
    return todoListAdapter.removeOne(id, { ...state });
  }),

  // update todo
  on(updateTodo, (state) => ({ ...state, isUpdatingTodo: true })),
  on(updateTodoSuccess, (state, action) => {
    return todoListAdapter.updateOne(action.todo, {
      ...state,
      isUpdatingTodo: false,
    });
  }),
  on(updateTodoError, (state) => ({ ...state, isUpdatingTodo: false })),

  // todo detail
  on(loadTodoDetail, (state) => ({ ...state, isLoadingTodoDetail: true })),
  on(loadTodoDetailSuccess, (state, action) => ({
    ...state,
    todoDetail: action.todo,
    isLoadingTodoDetail: false,
  })),
  on(loadTodoDetailError, (state) => ({ ...state, isLoadingTodoDetail: true })),
  on(cleanTodoDetail, (state) => ({
    ...state,
    todoDetail: {} as TodoResponse,
  })),

  // mark all as completed
  on(markAllAsCompleted, (state) => ({
    ...state,
    isMarkingAllAsCompleted: true,
  })),
  on(markAllAsCompletedSuccess, (state, action) => {
    return todoListAdapter.updateMany(action.todos, {
      ...state,
      isMarkingAllAsCompleted: false,
    });
  }),
  on(markAllAsCompletedError, (state) => ({
    ...state,
    isMarkingAllAsCompleted: false,
  }))
);
