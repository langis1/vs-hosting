export interface TodoRequest {
  id?: number;
  text: string;
  completed: boolean;
}

export interface TodoResponse extends TodoRequest {
  id: number;
}

export enum TodoStatus {
  ALL = 'all',
  COMPLETED = 'completed',
  UNCOMPLETED = 'uncompleted',
}
