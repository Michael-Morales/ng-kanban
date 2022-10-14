import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { fetchData } from './boards/state/boards.actions';

import { boards } from './boards/mock-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(fetchData({ boards }));
  }
}
