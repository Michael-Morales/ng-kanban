import { Injectable } from '@angular/core';

import { Board } from '../interfaces';

import { data } from './mock-data';

@Injectable({
  providedIn: 'root',
})
export class BoardsService {
  boards$: Board[] = data;

  constructor() {}
}
