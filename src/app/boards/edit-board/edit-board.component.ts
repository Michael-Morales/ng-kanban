import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { ModalService } from 'src/app/shared/modal.service';

import { selectAllBoards } from '../../store/selectors/boards.selectors';

import { Board } from '../../interfaces';

@Component({
  selector: 'app-edit-board',
  templateUrl: './edit-board.component.html',
  styleUrls: ['../add-board/add-board.component.css'],
})
export class EditBoardComponent implements OnInit {
  @Input() boardId?: number;
  board?: Board;
  editForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private modalService: ModalService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.store
      .select(selectAllBoards)
      .subscribe(
        (boards) =>
          (this.board = boards.find((board) => board.id === this.boardId))
      );

    this.editForm = this.fb.group({
      name: [this.board?.name, [Validators.required, Validators.minLength(3)]],
      columns: this.fb.array([]),
    });
    this.board?.columns.forEach((column) => {
      this.columns.push(
        this.fb.group({
          id: [column.id, Validators.required],
          name: [column.name, [Validators.required, Validators.minLength(3)]],
        })
      );
    });
  }

  get columns() {
    return this.editForm.get('columns') as FormArray;
  }

  onDelete(index: number) {
    this.columns.removeAt(index);
  }

  onSave() {
    if (this.editForm.valid && this.board) {
      this.modalService.closeModal();
    }
  }

  onAddNewColumn() {
    this.columns.push(
      this.fb.group({
        id: ['90', Validators.required],
        name: ['', [Validators.required, Validators.minLength(3)]],
      })
    );
  }
}
