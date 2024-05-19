export interface TodoRequest {
  id?: number;
  text: string;
  completed: boolean;
}

export interface TodoResponse extends TodoRequest {
  id: number;
}
