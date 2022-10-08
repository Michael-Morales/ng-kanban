import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';

import { Board, Column } from '../interfaces';

import { data } from './mock-data';

interface CreateBoardParam {
  name: string;
  columns: Column[];
}

@Injectable({
  providedIn: 'root',
})
export class BoardsService {
  boards$: BehaviorSubject<Board[]> = new BehaviorSubject<Board[]>(data);

  constructor() {}

  getBoardById(id: string | null | undefined) {
    return this.boards$.pipe(
      map((boards) => boards.find((board) => board.id === id))
    );
  }

  getBoardColumns(id: string | null | undefined) {
    return this.getBoardById(id).pipe(map((board) => board?.columns));
  }

  createBoard(board: CreateBoardParam) {
    const currentData = this.boards$.value;
    const newData = [
      ...currentData,
      { ...board, id: `${currentData.length + 1}` },
    ];

    this.boards$.next(newData);

    return this.boards$.value.length;
  }
}
