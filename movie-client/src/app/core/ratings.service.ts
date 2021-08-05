import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, throwError } from 'rxjs';
import { map, catchError, shareReplay, pluck, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RatingsService {

  httpOptions = {
    headers: new HttpHeaders( {
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  editRating(ratingId: number, userId: number, movieId: number, rating: number) {
    const putBody = {
      userId, movieId, rating
    };

    return this.http.put<any>(`/api/ratings/${ratingId}`, putBody, this.httpOptions).pipe(
      first(),
      catchError(e => throwError(e))
    );
  }

  createRating(movieId: number, userId: number, rating: number){
    const createBody = {
      movieId, userId, rating
    }

    return this.http.post<any>(`/api/ratings`, createBody, this.httpOptions).pipe(
      first(),
      catchError(e => throwError(e))
    )
  }

  getRatings(){
    return this.http.get<any>('/api/ratings', this.httpOptions).pipe(
      first(),
      catchError(e => throwError(e))
    );
  }

  deleteRating(ratingId: number) {
    return this.http.delete<any>(`/api/ratings/${ratingId}`, this.httpOptions).pipe(
      first(),
      catchError(e => throwError(e))
    );
  }
}
