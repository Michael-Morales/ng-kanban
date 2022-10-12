import { createAction, props } from '@ngrx/store';

import { Board } from '../../interfaces';

export const fetchBoards = createAction(
  '[Boards] Fetch Boards',
  props<{ boards: Board[] }>()
);

export const addBoard = createAction(
  '[Boards] Add Board',
  props<{ board: Board }>()
);

export const deleteBoard = createAction(
  '[Boards] Delete Board',
  props<{ id: string }>()
);

export const updateBoard = createAction(
  '[Boards] Update Board',
  props<{ id: string; name: string }>()
);
