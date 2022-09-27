import { Component, OnInit, Input } from '@angular/core';

import { ModalService } from 'src/app/shared/modal.service';

@Component({
  selector: 'app-delete-menu',
  templateUrl: './delete-menu.component.html',
  styleUrls: ['./delete-menu.component.css'],
})
export class DeleteMenuComponent implements OnInit {
  constructor(public modalService: ModalService) {}

  ngOnInit(): void {}
}
