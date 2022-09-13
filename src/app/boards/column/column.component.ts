import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Board, Column } from '../../interfaces';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.css'],
})
export class ColumnComponent implements OnInit {
  boards: Board[] = [
    {
      id: '1',
      name: 'platform launch',
      columns: [{ name: 'to do' }, { name: 'doing' }, { name: 'completed' }],
    },
    { id: '2', name: 'marketing plan', columns: [] },
  ];
  columns: Column[] | undefined = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(
      ({ id }) =>
        (this.columns = this.boards.find((board) => board.id === id)?.columns)
    );
  }
}
