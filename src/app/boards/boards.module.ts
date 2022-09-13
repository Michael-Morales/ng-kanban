import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardsRoutingModule } from './boards-routing.module';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { ColumnComponent } from './column/column.component';
import { EmptyComponent } from './empty/empty.component';

@NgModule({
  declarations: [HomeComponent, ColumnComponent, EmptyComponent],
  imports: [CommonModule, BoardsRoutingModule, SharedModule],
})
export class BoardsModule {}
