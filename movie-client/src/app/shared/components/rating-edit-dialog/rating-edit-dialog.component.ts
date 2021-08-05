import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface RatingEditDialogData {
  rating: number;
  // userId: number;
  // movieId: number;
  movieName: string;
}

@Component({
  selector: 'app-rating-edit-dialog',
  templateUrl: './rating-edit-dialog.component.html',
  styleUrls: ['./rating-edit-dialog.component.css']
})
export class RatingEditDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<RatingEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RatingEditDialogData) {}


  ngOnInit(): void {
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
