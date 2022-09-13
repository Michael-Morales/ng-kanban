import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardsModule } from './boards/boards.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, BoardsModule, SharedModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
