import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, tap, switchMap } from 'rxjs';
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
  columns$?: Column[] = [];
  boardId: string | null = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public modalService: ModalService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        tap((params) => console.log(params.get('id'))),
        tap((params) => (this.boardId = params.get('id'))),
        switchMap((params) =>
          this.store.select(selectAllBoards).pipe(
            map((boards) =>
              boards.find((board) => board.id.toString() === params.get('id'))
            ),
            tap((board) => {
              console.log(board);
            })
          )
        )
      )
      .subscribe((board) => (this.columns$ = board?.columns));
  }
}
