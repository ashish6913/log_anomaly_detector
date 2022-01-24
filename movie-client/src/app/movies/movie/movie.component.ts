import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/movie';
import { Rating } from "src/app/rating";
import { AuthService } from 'src/app/core/auth.service';
import { Observable } from 'rxjs';
import { RatingsService } from "src/app/core/ratings.service";
import { CatalogService } from "src/app/core/catalog.service";
import { CommentsService } from "src/app/core/comments.service";
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RatingEditDialogComponent } from 'src/app/shared/components/rating-edit-dialog/rating-edit-dialog.component';
import { first } from 'rxjs/operators';
import { Comment } from "src/app/comment";
import { TokenStorageService } from 'src/app/core/token-storage.service';


@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  public movie: Movie = new Movie();
  public authenticated$: Observable<boolean>;
  public userId;

  public ratingsData: Array<Rating> = [];
  public currentRating: Rating;
  public commentsData: Array<Comment> = [];
  public currentCommentText: String;
  public userVal: any;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private ratingService: RatingsService,
    private catalogService: CatalogService,
    private commentsService: CommentsService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private token : TokenStorageService) {
      
    this.authenticated$ = token.authenticated$;
    //this.userVal=token.getUser().id;
    this.userId = token.getUser().id;
    this.currentRating = new Rating();
    this.currentCommentText = '';
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.movie.id = params['id']
      this.movie.name = params['name']
      this.movie.description = params['description']
    });

    this.commentsService.getComments(this.movie.id).subscribe((response) => {
      for(var r of response._embedded.data){
        this.commentsData.push(r);
      }      
    })

    this.ratingService.getRatings().subscribe((response) => {
      for(var r of response._embedded.data){
        //we select only the ratings for the current movie, and exclude those from the current user
        if(r.movieId==this.movie.id){
          if(r.userId!=this.userId){
            this.ratingsData.push(r);
          } else {
            this.currentRating = r;
          }
          
        }
      }
    })
  }

  deleteComment(id: number) {
    this.commentsService.deleteComment(this.movie.id, id).subscribe((response) => {
      this.snackBar.open("Deleted your comment.", "", {
        duration: 2000,
        panelClass: ['small-snackbar']
      });
      this.refreshCommentsList();
    });
  }

  postComment() {
    console.log("current comment is" + this.currentCommentText);
    this.commentsService.createComment(this.userId, this.movie.id, this.currentCommentText).subscribe((response) => {
      console.log(response);
      this.snackBar.open("Posted your comment.", "", {
        duration: 2000,
        panelClass: ['small-snackbar']
      });
      this.refreshCommentsList();
    })
  }

  refreshCommentsList() {
    this.currentCommentText = '';
    this.commentsData=[];
    this.commentsService.getComments(this.movie.id).subscribe((response) => {
      for(var r of response._embedded.data){
        this.commentsData.push(r);
      }
    })
  }

  refreshRatingsList() {
    this.currentRating = new Rating()
    this.ratingsData=[];
    this.ratingService.getRatings().subscribe((response) => {
      for(var r of response._embedded.data){
        //we select only the ratings for the current movie, and exclude those from the current user
        if(r.movieId==this.movie.id){
          if(r.userId!=this.userId){
            this.ratingsData.push(r);
          } else {
            this.currentRating = r;
          }
          
        }
      }
    })
  }

  onDelete(ratingId: number) {
    this.ratingService.deleteRating(ratingId).subscribe(() => {
      this.snackBar.open("Deleted your rating.", "", {
        duration: 2000,
        panelClass: ['small-snackbar']
      });
      
      this.refreshRatingsList();
    });
  }

  onEdit(userRating: any){

    const movieName = this.movie.name;
    const rating = userRating.rating;

    const dialogRef = this.dialog.open(RatingEditDialogComponent, {
      width: '320px',
      data: {rating, movieName}
    });

    dialogRef.afterClosed().pipe(first()).subscribe(newRating => {
      if(this.currentRating.rating){
        this.ratingService.editRating(this.currentRating.id, this.userId, this.movie.id, newRating).subscribe(() => {
          this.snackBar.open("Updated your rating.", "", {
            duration: 2000,
            panelClass: ['small-snackbar']
          });
          this.refreshRatingsList();
        });
      } else if(newRating!=undefined) {
        this.ratingService.createRating(this.movie.id, this.userId, newRating).subscribe(() => {
          this.snackBar.open("Updated your rating.", "", {
            duration: 2000,
            panelClass: ['small-snackbar']
          });
          this.refreshRatingsList();
        });
      }
    });

  }
}
