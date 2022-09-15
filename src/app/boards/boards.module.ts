import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { BoardsRoutingModule } from './boards-routing.module';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { ColumnComponent } from './column/column.component';
import { EmptyComponent } from './empty/empty.component';
import { TaskComponent } from './task/task.component';

@NgModule({
  declarations: [HomeComponent, ColumnComponent, EmptyComponent, TaskComponent],
  imports: [
    CommonModule,
    BoardsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class BoardsModule {}
