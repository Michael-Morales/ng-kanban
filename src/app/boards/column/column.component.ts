import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, tap } from 'rxjs';
import { Store } from '@ngrx/store';

import { ModalService } from 'src/app/shared/modal.service';

import { selectAllBoards } from '../../store/selectors/boards.selectors';

import { Column } from '../../interfaces';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.css'],
})
export class ColumnComponent implements OnInit {
  columns?: Column[] = [];
  boardId: string | null = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public modalService: ModalService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(tap((params) => (this.boardId = params.get('id'))))
      .subscribe((params) => {
        this.store
          .select(selectAllBoards)
          .pipe(
            map((boards) =>
              boards.find((board) => board.id.toString() === params.get('id'))
            )
          )
          .subscribe((board) => {
            if (!board) {
              this.router.navigateByUrl('/404');
            } else {
              this.columns = board.columns;
            }
          });
      });
  }
}
