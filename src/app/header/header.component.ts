import { Component, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';

import { BoardsService } from '../boards/boards.service';

import { Board } from '../interfaces';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  currentBoard?: Board;

  constructor(private router: Router, private boardsService: BoardsService) {}

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter(
          (e) =>
            e instanceof ActivationEnd &&
            Object.keys(e.snapshot.params).length > 0
        ),
        map((e) => (e instanceof ActivationEnd ? e.snapshot.params : {}))
      )
      .subscribe((params) => {
        this.currentBoard = this.boardsService.boards$.find(
          ({ id }) => id === params['id']
        );
      });
  }
}
