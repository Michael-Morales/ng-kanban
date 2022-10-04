import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';

import { Board } from '../interfaces';

import { data } from './mock-data';

@Injectable({
  providedIn: 'root',
})
export class BoardsService {
  boards$: BehaviorSubject<Board[]> = new BehaviorSubject(data);

  constructor() {}

  getBoardById(id: string | null | undefined) {
    return this.boards$.pipe(
      map((boards) => boards.find((board) => board.id === id))
    );
  }

  getBoardColumns(id: string | null | undefined) {
    return this.getBoardById(id).pipe(map((board) => board?.columns));
  }
}
