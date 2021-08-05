import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RatingListComponent } from './rating-list/rating-list.component';
import { RatingsRoutingModule } from './ratings-routing.module';



@NgModule({
  declarations: [
    RatingListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RatingsRoutingModule
  ]
})
export class RatingsModule { }
