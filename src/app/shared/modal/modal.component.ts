import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
  ElementRef,
  Input,
} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit, OnDestroy {
  @Output() dismiss = new EventEmitter();
  @Input() title = '';
  @Input() type = '';
  showMenu = false;

  constructor(private el: ElementRef) {}

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
    console.log('edit');
  }

  onDeleteClick() {
    console.log('delete');
  }
}
