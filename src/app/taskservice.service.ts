import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators'
import { TaskVO } from './task';


const endpoint = 'http://localhost:8081/';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})

export class TaskserviceService {


  constructor(public http: HttpClient) {

  }

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }


  getTasks(): Observable<any> {
    return this.http.get(endpoint + "tasks").pipe(map(this.extractData));
  }

  getTask(id: number): Observable<any> {
    return this.http.get(endpoint + "tasks/" + id).pipe(map(this.extractData));
  }

  deleteTask(id: number): Observable<any> {
    return this.http.delete<any>(endpoint + 'task/' + id).pipe(tap(_ => console.log('deleted task id=${id}')), catchError(this.handleError<any>('deleteTask')));
  }

  updateTask(id: number, task: TaskVO): Observable<any> {
    console.log(JSON.stringify(task));
    console.log(id);
    return this.http.put(endpoint + 'tasks/' + id, JSON.stringify(task), httpOptions).pipe(tap(_ => console.log('updated task id=${id}')), catchError(this.handleError<any>('updateTask')));
  }

  addTask(task: TaskVO): Observable<any> {
    console.log(task);
    return this.http.post<any>(endpoint + 'tasks', JSON.stringify(task), httpOptions).pipe(tap((task) => console.log('added task id=${task.task_id}')), catchError(this.handleError<any>('addTask')));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log('${operation} failed: ${error.message}');
      return of(result as T);
    };
  }

}
