import { createAction, props } from '@ngrx/store';

import { Column } from '../../interfaces';

export const fetchColumns = createAction(
  '[Columns] Fetch Columns',
  props<{ columns: Column[] }>()
);

export const addColumn = createAction(
  '[Columns] Add Column',
  props<{ column: Column }>()
);

export const deleteColumn = createAction(
  '[Columns] Delete Column',
  props<{ id: string }>()
);

export const updateColumn = createAction(
  '[Columns] Update Column',
  props<{ id: string; name: string }>()
);
