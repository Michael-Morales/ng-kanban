import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

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

export const updateBoard = createAction(
  '[Boards] Update Board',
  props<{ board: Update<IBoard>; columns: IColumn[] }>()
);

export const createColumn = createAction(
  '[Boards] Create Column',
  props<{ column: IColumn }>()
);

export const createTask = createAction(
  '[Board] Create Task',
  props<{ task: ITask; subtasks: ISubTask[] }>()
);
