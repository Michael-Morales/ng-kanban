import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { ModalService } from 'src/app/shared/modal.service';

@Component({
  selector: 'app-delete-menu',
  templateUrl: './delete-menu.component.html',
  styleUrls: ['./delete-menu.component.css'],
})
export class DeleteMenuComponent implements OnInit {
  @Output() delete = new EventEmitter();

  constructor(private modalService: ModalService) {}

  ngOnInit(): void {}

  onDeleteClick() {
    this.delete.emit();
  }

  dismiss() {
    this.modalService.closeModal();
  }
}
