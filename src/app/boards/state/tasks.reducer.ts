import { createReducer, on } from '@ngrx/store';

import { Task } from '../../interfaces';

export const initialState: ReadonlyArray<Task> = [];

export const tasksReducer = createReducer(initialState);
