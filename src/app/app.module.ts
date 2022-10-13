import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardsModule } from './boards/boards.module';
import { SharedModule } from './shared/shared.module';
import { HeaderComponent } from './header/header.component';
import { NavMenuComponent } from './header/nav-menu/nav-menu.component';
import { NotFoundComponent } from './not-found/not-found.component';

import { boardsReducer } from './boards/state/boards.reducer';
import { columnsReducer } from './boards/state/columns.reducer';
import { tasksReducer } from './boards/state/tasks.reducer';
import { subtasksReducer } from './boards/state/subtasks.reducer';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavMenuComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    BoardsModule,
    AppRoutingModule,
    SharedModule,
    StoreModule.forRoot({
      boards: boardsReducer,
      columns: columnsReducer,
      tasks: tasksReducer,
      subtasks: subtasksReducer,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
