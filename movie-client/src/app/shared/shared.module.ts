import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RatingEditDialogComponent } from './components/rating-edit-dialog/rating-edit-dialog.component';

const sharedModules = [
  FlexLayoutModule, 
  MaterialModule, 
  RouterModule,
  FormsModule,
  ReactiveFormsModule
]

@NgModule({
  declarations: [
    RatingEditDialogComponent,
  ],
  imports: [
    CommonModule,
    ...sharedModules
  ],
  exports: [
    ...sharedModules
  ]
})
export class SharedModule { }
