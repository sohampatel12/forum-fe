import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse, HttpHeaders } from '@angular/common/http';
import { catchError, tap, retry } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { User } from '../dto/user';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  public getPosts(): Observable<Object> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    return this.http.get('http://localhost:8000/api/getPosts', options).pipe(
      tap(data => console.log("Data :: " + data)),
      catchError(this.handleError)
    );
  }
  
  public createPost(body): Observable<Object> {
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    let options = { headers: headers };
    return this.http.post('http://localhost:8000/api/createPost', body, options).pipe(
      tap(data => console.log("Data :: " + data)),
      catchError(this.handleError)
    );
  }

  public addComment(body): Observable<Object> {
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    let options = { headers: headers };
    return this.http.post('http://localhost:8000/api/addComment', body, options).pipe(
      tap(data => console.log("Data :: " + data)),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(error.error);
  };
}
