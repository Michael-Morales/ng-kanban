import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BoardsService } from '../boards.service';

import { Column } from '../../interfaces';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.css'],
})
export class ColumnComponent implements OnInit {
  columns: Column[] | undefined = [];

  constructor(
    private route: ActivatedRoute,
    private boardsService: BoardsService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(
      ({ id }) =>
        (this.columns = this.boardsService.boards$.find(
          (board) => board.id === id
        )?.columns)
    );
  }
}
