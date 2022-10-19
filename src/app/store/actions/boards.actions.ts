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

export const deleteColumn = createAction(
  '[Boards] Delete Column',
  props<{ id: number }>()
);

export const createTask = createAction(
  '[Boards] Create Task',
  props<{ task: ITask; subtasks: ISubTask[] }>()
);

export const deleteTask = createAction(
  '[Boards] Delete Task',
  props<{ id: number }>()
);

export const updateTask = createAction(
  '[Boards] Update Task',
  props<{ task: Update<ITask>; subtasks: ISubTask[] }>()
);

export const toggleSubtask = createAction(
  '[Boards] Toggle Subtask',
  props<{ update: Update<ISubTask> }>()
);

export const deleteSubtask = createAction(
  '[Boards] Delete Subtask',
  props<{ id: number }>()
);

export const updateTaskColumn = createAction(
  '[Boards] Update Task Column',
  props<{ update: Update<ITask> }>()
);
