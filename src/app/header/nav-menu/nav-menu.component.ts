import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { HeaderService } from '../header.service';

import { selectBoards } from '../../store/selectors/boards.selectors';

import { IBoard } from '../../interfaces';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
})
export class NavMenuComponent implements OnInit {
  boards$: Observable<IBoard[]> = this.store.select(selectBoards);

  constructor(public headerService: HeaderService, private store: Store) {}

  ngOnInit(): void {}
}
