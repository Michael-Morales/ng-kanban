import { createAction, props } from '@ngrx/store';

import { Task } from '../../interfaces';

interface UpdateProps {
  title: string;
  description?: string;
  status: string;
}

export const fetchTasks = createAction(
  '[Tasks] Fetch Tasks',
  props<{ tasks: Task[] }>()
);

export const addTask = createAction(
  '[Tasks] Add Task',
  props<{ task: Task }>()
);

export const deleteTask = createAction(
  '[Tasks] Delete Task',
  props<{ id: string }>()
);

export const updateTask = createAction(
  '[Tasks] Update Task',
  props<{ id: string; data: UpdateProps }>()
);
