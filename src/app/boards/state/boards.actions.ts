import { createAction, props } from '@ngrx/store';

import { Board, Column, Task, SubTask } from '../../interfaces';

export const fetchData = createAction(
  '[Boards] Fetch Boards',
  props<{
    boards: Board[];
  }>()
);

export const createBoard = createAction(
  '[Boards] Create Board',
  props<{ board: { name: string; columns: Column[] } }>()
);

export const deleteBoard = createAction(
  '[Board] Delete Board',
  props<{ id: string }>()
);
