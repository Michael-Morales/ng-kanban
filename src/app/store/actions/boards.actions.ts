import { createAction, props } from '@ngrx/store';

import { IBoard, IColumn, ITask, ISubTask } from '../../interfaces';

export const fetchData = createAction(
  '[Boards] Fetch Data',
  props<{
    boards: IBoard[];
    columns: IColumn[];
    tasks: ITask[];
    subtasks: ISubTask[];
  }>()
);

export const createBoard = createAction(
  '[Boards] Create Board',
  props<{ board: IBoard; columns: IColumn[] }>()
);

export const deleteBoard = createAction(
  '[Boards] Delete Board',
  props<{ id: number }>()
);
