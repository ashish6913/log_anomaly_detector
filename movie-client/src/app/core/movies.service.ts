import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  httpOptions = {
    headers: new HttpHeaders( {
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  getMovieList$$() {
    // trailing slash is needed in container env.
    return this.http.get<any>('/api/movies/', this.httpOptions);
  }

  getMovie$(mid: number) {

  }

}
