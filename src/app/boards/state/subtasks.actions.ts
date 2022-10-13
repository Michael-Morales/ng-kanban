import { createAction, props } from '@ngrx/store';

import { SubTask } from '../../interfaces';

export const fetchSubtasks = createAction(
  '[Subtasks] Fetch Subtasks',
  props<{ subtasks: SubTask[] }>()
);

export const addSubtask = createAction(
  '[Subtasks] Add Subtask',
  props<{ subtask: SubTask }>()
);

export const deleteSubtask = createAction(
  '[Subtasks] Delete Subtask',
  props<{ id: string }>()
);

export const updateSubtask = createAction(
  '[Subtasks] Update Subtask',
  props<{ id: string; title: string }>()
);

export const toggleSubtask = createAction(
  '[Subtasks] Toggle Subtask',
  props<{ id: string }>()
);
