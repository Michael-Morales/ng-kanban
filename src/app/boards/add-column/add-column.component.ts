import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { ModalService } from 'src/app/shared/modal.service';

import { createColumn } from '../../store/actions/boards.actions';

import { generateId } from '../../store/reducers/boards.reducer';

@Component({
  selector: 'app-add-column',
  templateUrl: './add-column.component.html',
})
export class AddColumnComponent implements OnInit {
  @Input() boardId: string | null = '';
  addForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
  });

  constructor(
    private fb: FormBuilder,
    private modalService: ModalService,
    private store: Store
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    if (this.addForm.valid && this.boardId) {
      this.store.dispatch(
        createColumn({
          column: {
            id: generateId(),
            name: this.addForm.get('name')?.value,
            boardId: +this.boardId,
          },
        })
      );

      this.modalService.closeModal();
    }
  }
}
