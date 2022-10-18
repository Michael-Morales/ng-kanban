import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
  ElementRef,
  Input,
} from '@angular/core';

import { ModalService } from '../modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit, OnDestroy {
  @Output() dismiss = new EventEmitter();
  @Input() id = '';
  @Input() header = '';
  @Input() type = '';
  showMenu = false;

  constructor(private el: ElementRef, private modalService: ModalService) {}

  ngOnInit(): void {
    document.body.appendChild(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.el.nativeElement.remove();
  }

  onDismissClick() {
    this.dismiss.emit();
  }

  onEditClick() {
    this.modalService.openModal(this.id + ' edit');
  }

  onDeleteClick() {
    this.modalService.openModal(this.id + ' delete');
  }
}
