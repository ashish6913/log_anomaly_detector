import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/auth.service';
import { CatalogService } from 'src/app/core/catalog.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RatingEditDialogComponent } from 'src/app/shared/components/rating-edit-dialog/rating-edit-dialog.component';
import { RatingsService } from 'src/app/core/ratings.service';
import { first } from 'rxjs/operators';
import { TokenStorageService } from 'src/app/core/token-storage.service';

@Component({
  selector: 'app-rating-list',
  templateUrl: './rating-list.component.html',
  styleUrls: ['./rating-list.component.css']
})
export class RatingListComponent implements OnInit {
  public userId;
  userRatings$: Observable<any[]>;

  constructor(
    private authSerivce: AuthService, 
    private catalogService: CatalogService,
    private ratingsService: RatingsService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private token:TokenStorageService
  ) { 
    
    this.userId = token.getUser().id;
    this.userRatings$ = catalogService.getUserMovieRatings(this.userId);
  }

  ngOnInit(): void {
  }

  refreshRatingsList() {
    this.userRatings$ = this.catalogService.getUserMovieRatings(this.userId);
  }

  onEdit(userRating: any){

    const ratingId = userRating.rating.id;
    const userId =this.userId;
    const movieId = userRating.movie.id;
    const movieName = userRating.movie.name;
    const rating = userRating.rating.rating;

    const dialogRef = this.dialog.open(RatingEditDialogComponent, {
      width: '320px',
      data: {rating, movieName}
    });

    dialogRef.afterClosed().pipe(first()).subscribe(newRating => {
      this.ratingsService.editRating(ratingId, userId, movieId, newRating).subscribe(() => {
        this.snackBar.open("Updated your rating.", "", {
          duration: 2000,
          panelClass: ['small-snackbar']
        });
        this.refreshRatingsList();
      });
    });

  }

  onDelete(ratingId: number) {
    this.ratingsService.deleteRating(ratingId).subscribe(() => {
      this.snackBar.open("Deleted your rating.", "", {
        duration: 2000,
        panelClass: ['small-snackbar']
      });
      this.refreshRatingsList();
    });
  }
}
