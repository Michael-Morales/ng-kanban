import { createReducer, on } from '@ngrx/store';

import { SubTask } from '../../interfaces';

export const initialState: ReadonlyArray<SubTask> = [];

export const subtasksReducer = createReducer(initialState);
