import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminBoardComponent } from './admin-board/admin-board.component';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';


@NgModule({
  declarations: [
    AdminBoardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }

