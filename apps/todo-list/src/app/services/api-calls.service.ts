import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TodoRequest, TodoResponse } from '../models/todo.models';
import { Environment, ENVIRONMENT } from '../../environment';

@Injectable({
  providedIn: 'root',
})
export class ApiCallsService {
  constructor(
    private http: HttpClient,
    @Inject(ENVIRONMENT) private environment: Environment
  ) {}

  public listTodos(): Observable<TodoResponse[]> {
    return this.http.get<TodoResponse[]>(`${this.environment.apiUrl}/todos`, {
      params: { clientId: this.environment.clientId },
    });
  }

  public createTodo(params: TodoRequest): Observable<TodoResponse> {
    const requestParams = { ...params, clientId: this.environment.clientId };
    return this.http.post<TodoResponse>(
      `${this.environment.apiUrl}/todos`,
      requestParams
    );
  }

  public deleteTodo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.environment.apiUrl}/todos/${id}`);
  }

  public updateTodo(params: TodoRequest): Observable<TodoResponse> {
    return this.http.put<TodoResponse>(
      `${this.environment.apiUrl}/todos/${params.id}`,
      params
    );
  }

  public getTodoDetail(id: number): Observable<TodoResponse> {
    return this.http.get<TodoResponse>(
      `${this.environment.apiUrl}/todos/${id}`,
      {
        params: { clientId: this.environment.clientId },
      }
    );
  }

  public markAllAsCompleted(): Observable<TodoResponse[]> {
    const params = new HttpParams().set('clientId', this.environment.clientId);

    return this.http.patch<TodoResponse[]>(
      `${this.environment.apiUrl}/todos/mark-all-as-completed`,
      {},
      { params }
    );
  }
}
