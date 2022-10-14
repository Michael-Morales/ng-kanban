import { createAction, props } from '@ngrx/store';

import { Board, Column, Task, SubTask } from '../../interfaces';

import {
  StateBoard,
  StateColumn,
  StateTask,
  StateSubTask,
} from './boards.reducer';

export const fetchData = createAction(
  '[Boards] Fetch Boards',
  props<{
    boards: StateBoard[];
    columns: StateColumn[];
    tasks: StateTask[];
    subtasks: StateSubTask[];
  }>()
);

export const createBoard = createAction(
  '[Boards] Create Board',
  props<{ board: Board }>()
);
