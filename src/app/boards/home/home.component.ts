import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { HeaderService } from 'src/app/header/header.service';
import { ModalService } from 'src/app/shared/modal.service';

import { checkBoardsLength } from '../../store/selectors/boards.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  length$?: Observable<number> = this.store.select(checkBoardsLength);

  constructor(
    private headerService: HeaderService,
    public modalService: ModalService,
    private store: Store
  ) {}

  ngOnInit(): void {}

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
