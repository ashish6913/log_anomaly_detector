import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminBoardComponent } from './admin-board/admin-board.component';
const routes: Routes = [
  {
    path: 'admin-board',
    component: AdminBoardComponent,
  },
  {
    path: '',
    redirectTo: 'admin-board',
    pathMatch: 'full'
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }