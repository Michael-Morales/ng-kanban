import { createReducer, on } from '@ngrx/store';

import { Task } from '../../interfaces';

import { fetchTasks, addTask, deleteTask, updateTask } from './tasks.actions';

export const initialState: ReadonlyArray<Task> = [];

export const tasksReducer = createReducer(
  initialState,
  on(fetchTasks, (_, { tasks }) => tasks),
  on(addTask, (state, { task }) => [...state, task]),
  on(deleteTask, (state, { id }) => state.filter((task) => task.id !== id)),
  on(updateTask, (state, { id, data }) =>
    state.map((task) => (task.id === id ? { ...task, ...data } : task))
  )
);
