import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';

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
    private boardsService: BoardsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(map(({ id }) => this.boardsService.getBoardById(id)))
      .subscribe((board) => {
        if (board) {
          this.columns = board.columns;
        } else {
          this.router.navigateByUrl('/boards');
        }
      });
  }
}
