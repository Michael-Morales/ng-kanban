import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

import { BoardsService } from '../boards.service';
import { ModalService } from 'src/app/shared/modal.service';

import { Board } from '../../interfaces';

@Component({
  selector: 'app-edit-board',
  templateUrl: './edit-board.component.html',
  styleUrls: ['../add-board/add-board.component.css'],
})
export class EditBoardComponent implements OnInit {
  @Input() board?: Board;
  editForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private boardsService: BoardsService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.editForm = this.fb.group({
      name: [this.board?.name, [Validators.required, Validators.minLength(3)]],
      columns: this.fb.array([]),
    });

    this.board?.columns.forEach((column) => {
      this.columns.push(
        this.fb.group({
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
      this.boardsService.updateBoard(this.editForm.value, this.board.id);
      this.modalService.closeModal();
    }
  }

  onAddNewColumn() {
    this.columns.push(
      this.fb.group({
        columnName: ['', [Validators.required, Validators.minLength(3)]],
      })
    );
  }
}
