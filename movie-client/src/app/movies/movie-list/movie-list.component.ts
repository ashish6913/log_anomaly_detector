import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/core/movies.service';
import { Movie } from "../../movie";
import { AuthService } from 'src/app/core/auth.service';
import { Observable } from 'rxjs';
import { Router } from "@angular/router";
import { CatalogService } from "src/app/core/catalog.service";
import { Rating } from 'src/app/rating';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})

export class MovieListComponent implements OnInit {
  
  authenticated$: Observable<boolean>;
  data: Array<Movie>;
  ratingsData: Array<any>
  ratings: Array<Rating>

  constructor(private movieService:MoviesService, private authService: AuthService, private router: Router, private catalogueService: CatalogService) { 
    this.authenticated$ = authService.authenticated$;
    this.data=[];
    this.ratingsData=[];
    this.ratings=[]
  }

  selectRandomCovers(){
    for(var movie of this.data){
      var x = '../../../assets/cover'+Math.floor(Math.random() * (3 - 1 + 1) + 1)+'.jpg';
      movie.cover = x
    }
  }
  
  ngOnInit(): void {
    
    this.movieService.getMovieList$$().subscribe((response) =>  { 
                                                                  this.data=response._embedded.data
                                                                  this.selectRandomCovers();
                                                                });
    if(this.authenticated$){                                                     
      this.catalogueService.getUserMovieRatings(this.authService.userId).subscribe((response) =>  { 
                                                                    this.ratingsData=response;
                                                                    //we join the arrays so we can display a user's ratings on the card
                                                                    //performance could later be improved by doing this differently
                                                                    for(var rating of this.ratingsData){
                                                                      this.ratings.push(rating.rating);
                                                                    }
                                                                    for(var movie of this.data){
                                                                      for(var rate of this.ratings){
                                                                        if(rate.movieId==movie.id){
                                                                          movie.rating=rate;
                                                                        }
                                                                      }
                                                                    }
                                                                  });                                              
    }
  }

}
