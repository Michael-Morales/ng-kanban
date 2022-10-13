import { createReducer, on } from '@ngrx/store';

import { SubTask } from '../../interfaces';

import {
  fetchSubtasks,
  addSubtask,
  deleteSubtask,
  updateSubtask,
  toggleSubtask,
} from './subtasks.actions';

export const initialState: ReadonlyArray<SubTask> = [];

export const subtasksReducer = createReducer(
  initialState,
  on(fetchSubtasks, (_, { subtasks }) => subtasks),
  on(addSubtask, (state, { subtask }) => [...state, subtask]),
  on(deleteSubtask, (state, { id }) =>
    state.filter((subtask) => subtask.id !== id)
  ),
  on(updateSubtask, (state, { id, title }) =>
    state.map((subtask) =>
      subtask.id === id ? { ...subtask, title } : subtask
    )
  ),
  on(toggleSubtask, (state, { id }) =>
    state.map((subtask) =>
      subtask.id === id
        ? { ...subtask, isCompleted: !subtask.isCompleted }
        : subtask
    )
  )
);
