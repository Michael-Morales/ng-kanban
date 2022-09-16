import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BoardsService } from '../boards.service';

import { Board } from '../../interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  boards: Board[] = [];

  constructor(private boardsService: BoardsService, private router: Router) {}

  ngOnInit(): void {
    this.boardsService.boards$.subscribe((boards) => (this.boards = boards));
  }
}
