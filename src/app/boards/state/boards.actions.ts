import { createAction, props } from '@ngrx/store';

import { Board } from '../../interfaces';

export const addBoard = createAction(
  '[Boards] Add Board',
  props<{ board: Board }>()
);

export const deleteBoard = createAction(
  '[Boards] Delete Board',
  props<{ id: string }>()
);

export const udpateBoard = createAction(
  '[Boards] Update Board',
  props<{ id: string; name: string }>()
);
