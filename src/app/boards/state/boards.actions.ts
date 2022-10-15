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
