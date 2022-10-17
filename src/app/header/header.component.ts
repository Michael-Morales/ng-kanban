import { Component, OnInit } from '@angular/core';
import { ActivationEnd, Params, Router } from '@angular/router';
import { filter, map, combineLatest, tap } from 'rxjs';
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
export class HeaderComponent implements OnInit {
  boards$?: Board[];
  currentBoard$?: Board;

  constructor(
    private router: Router,
    public headerService: HeaderService,
    public modalService: ModalService,
    private store: Store
  ) {}

  ngOnInit(): void {
    combineLatest([this.store.select(selectAllBoards), this.router.events])
      .pipe(
        tap(([boards]) => (this.boards$ = boards)),
        filter(
          ([, e]) =>
            e instanceof ActivationEnd &&
            Object.keys(e.snapshot.params).length > 0
        ),
        map(([boards, e]): [Board[], Params] => [
          boards,
          e instanceof ActivationEnd ? e.snapshot.params : {},
        ]),
        map(([boards, { id }]) =>
          boards.find((board) => board.id.toString() === id)
        )
      )
      .subscribe((board) => {
        this.currentBoard$ = board;
        this.headerService.closeMenus();
      });
  }

  onDeleteClick() {
    if (this.currentBoard$) {
      this.store.dispatch(deleteBoard({ id: this.currentBoard$.id }));
      this.router.navigateByUrl('/boards');
      this.modalService.closeModal();
    }
  }
}
