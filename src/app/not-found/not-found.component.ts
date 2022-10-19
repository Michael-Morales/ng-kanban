import { Component, OnInit } from '@angular/core';

import { HeaderService } from '../header/header.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css'],
})
export class NotFoundComponent implements OnInit {
  constructor(private headerService: HeaderService) {}

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
