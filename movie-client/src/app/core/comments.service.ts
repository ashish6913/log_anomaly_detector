import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, throwError } from 'rxjs';
import { map, catchError, shareReplay, pluck, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  httpOptions = {
    headers: new HttpHeaders( {
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {  }

  createComment(userId: number, movieId: number, description: String){
    const createBody = {
      movieId, userId, description
    }
    console.log(createBody);
    console.log(movieId);
    console.log("user id is "+ userId);
    console.log("description is "+ description);

    return this.http.post<any>(`http://comments-lad-poc.apps.xnkpeyx0.canadacentral.aroapp.io/movie/${movieId}/comments`, createBody, this.httpOptions).pipe(
      first(),
      catchError(e => throwError(e))
    )
  }

  getComments(movieId: number){
    return this.http.get<any>(`/api/comments/${movieId}/comments`, this.httpOptions).pipe(
      first(),
      catchError(e => throwError(e))
    );
  }

  deleteComment(movieId: number, commentId: number) {
    return this.http.delete<any>(`/api/comments/${movieId}/comments/${commentId}`, this.httpOptions).pipe(
      first(),
      catchError(e => throwError(e))
    );
  }
}
