import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map, switchMap, takeUntil, Subject } from 'rxjs';
import { Store } from '@ngrx/store';

import { ModalService } from '../shared/modal.service';
import { HeaderService } from './header.service';

import { selectAllBoards } from '../store/selectors/boards.selectors';

import { deleteBoard } from '../store/actions/boards.actions';

import { Board } from '../interfaces';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  currentBoard$?: Board;
  unsubscribe$ = new Subject<void>();

  constructor(
    private router: Router,
    public headerService: HeaderService,
    public modalService: ModalService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter(
          (e) =>
            e instanceof ActivationEnd &&
            Object.keys(e.snapshot.params).length > 0
        ),
        map((e) => (e instanceof ActivationEnd ? e.snapshot.params : {})),
        switchMap((params) =>
          this.store.select(selectAllBoards).pipe(
            map((boards) =>
              boards.find((board) => board.id.toString() === params['id'])
            ),
            takeUntil(this.unsubscribe$)
          )
        )
      )
      .subscribe((board) => {
        this.currentBoard$ = board;
        this.headerService.closeMenus();
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onDeleteClick() {
    if (this.currentBoard$) {
      this.store.dispatch(deleteBoard({ id: this.currentBoard$.id }));
      this.currentBoard$ = undefined;
      this.router.navigateByUrl('/boards');
      this.modalService.closeModal();
    }
  }
}
