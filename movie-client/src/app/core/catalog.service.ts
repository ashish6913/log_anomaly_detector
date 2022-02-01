import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, throwError } from 'rxjs';
import { map, catchError, shareReplay, pluck } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  httpOptions = {
    headers: new HttpHeaders( {
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  getUserMovieRatings(userId: number) {
    if (!userId){
      userId =0;
    }
    return this.http.get<any>(`/api/catalog/${userId}`, this.httpOptions).pipe(
      map(movieRatings => movieRatings._embedded ? movieRatings._embedded.data : []),
      shareReplay(1),
      catchError(e => {
        if (e.error) {
          return throwError(e);
        } else {
          return of([]);
        }
      })

    );
  }
}
