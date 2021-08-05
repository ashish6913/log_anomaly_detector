import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RatingListComponent } from './rating-list/rating-list.component';

const routes: Routes = [
  {
    path: '',
    component: RatingListComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RatingsRoutingModule { }