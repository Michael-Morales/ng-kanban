import { Component, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { Store } from '@ngrx/store';

import { ModalService } from '../shared/modal.service';
import { HeaderService } from './header.service';

import { selectData } from '../boards/state/boards.selectors';

import { Board } from '../interfaces';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  boards?: Board[];
  currentBoard?: Board;

  constructor(
    private router: Router,
    public headerService: HeaderService,
    public modalService: ModalService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.store.select(selectData).subscribe((boards) => {
      this.boards = boards;

      this.router.events
        .pipe(
          filter(
            (e) =>
              e instanceof ActivationEnd &&
              Object.keys(e.snapshot.params).length > 0
          ),
          map((e) => (e instanceof ActivationEnd ? e.snapshot.params : {})),
          map(({ id }) => boards?.find((board) => id === board.id))
        )
        .subscribe((board) => {
          this.currentBoard = board;
          this.headerService.closeMenus();
        });
    });
  }

  onDeleteClick() {
    if (this.currentBoard) {
      this.router.navigateByUrl('/boards');
      this.modalService.closeModal();
    }
  }
}
