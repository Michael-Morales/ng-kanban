import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, tap, switchMap, takeUntil, Subject } from 'rxjs';
import { Store } from '@ngrx/store';

import { ModalService } from 'src/app/shared/modal.service';

import { selectAllBoards } from '../../store/selectors/boards.selectors';

import { Column } from '../../interfaces';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.css'],
})
export class ColumnComponent implements OnInit, OnDestroy {
  columns$?: Column[] = [];
  boardId: string | null = '';
  unsubscribe$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public modalService: ModalService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        tap((params) => (this.boardId = params.get('id'))),
        switchMap((params) =>
          this.store.select(selectAllBoards).pipe(
            map((boards) =>
              boards.find((board) => board.id.toString() === params.get('id'))
            ),
            tap((board) => {
              if (!board) {
                this.router.navigateByUrl('/404');
              }
            }),
            takeUntil(this.unsubscribe$)
          )
        )
      )
      .subscribe((board) => (this.columns$ = board?.columns));
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
