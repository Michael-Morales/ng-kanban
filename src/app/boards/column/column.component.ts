import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Column } from '../../interfaces';

import { data } from '../mock-data';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.css'],
})
export class ColumnComponent implements OnInit {
  boards = data;
  columns: Column[] | undefined = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(
      ({ id }) =>
        (this.columns = this.boards.find((board) => board.id === id)?.columns)
    );
  }
}
