import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { HeaderService } from 'src/app/header/header.service';
import { ModalService } from 'src/app/shared/modal.service';

import { selectData } from '../state/boards.selectors';

import { Board } from '../../interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  boards?: Board[];

  constructor(
    private headerService: HeaderService,
    public modalService: ModalService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.store.select(selectData).subscribe((boards) => (this.boards = boards));
  }

  dismissHeaderMenu() {
    if (
      this.headerService.showMenu ||
      this.headerService.showNav ||
      this.headerService.showSidebar
    ) {
      this.headerService.closeMenus();
    }
  }
}
