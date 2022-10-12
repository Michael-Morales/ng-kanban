import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { fetchBoards } from './boards/state/boards.actions';
import { fetchColumns } from './boards/state/columns.actions';

import { boards, columns } from './boards/mock-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(fetchBoards({ boards }));
    this.store.dispatch(fetchColumns({ columns }));
  }
}
