import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ColumnComponent } from './column/column.component';

const routes: Routes = [
  {
    path: 'boards',
    component: HomeComponent,
    children: [{ path: ':id', component: ColumnComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoardsRoutingModule {}
