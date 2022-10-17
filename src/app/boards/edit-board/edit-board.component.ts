import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { ModalService } from 'src/app/shared/modal.service';

import {
  selectAllBoards,
  selectColumns,
} from '../../store/selectors/boards.selectors';

import { updateBoard } from '../../store/actions/boards.actions';

import { Board, IColumn } from '../../interfaces';

@Component({
  selector: 'app-edit-board',
  templateUrl: './edit-board.component.html',
  styleUrls: ['../add-board/add-board.component.css'],
})
export class EditBoardComponent implements OnInit {
  @Input() boardId?: number;
  board?: Board;
  allColumns?: IColumn[];
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

    this.store
      .select(selectColumns)
      .subscribe((columns) => (this.allColumns = columns));

    this.editForm = this.fb.group({
      id: [this.boardId, Validators.required],
      name: [this.board?.name, [Validators.required, Validators.minLength(3)]],
      columns: this.fb.array([]),
    });

    this.board?.columns.forEach((column) => {
      this.columns.push(
        this.fb.group({
          id: [column.id, Validators.required],
          boardId: [column.boardId, Validators.required],
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
      this.store.dispatch(
        updateBoard({
          board: {
            id: this.board.id,
            changes: { name: this.editForm.get('name')?.value },
          },
          columns: this.columns.value,
        })
      );

      this.modalService.closeModal();
    }
  }

  onAddNewColumn() {
    if (this.board) {
      const getNewColumnId = (): number | void => {
        if (this.allColumns) {
          if (!this.columns.length) {
            return this.allColumns[this.allColumns.length - 1].id + 1;
          } else {
            return this.columns.value[this.columns.length - 1].id + 1;
          }
        }
      };

      this.columns.push(
        this.fb.group({
          id: [getNewColumnId(), Validators.required],
          boardId: [this.boardId, Validators.required],
          name: ['', [Validators.required, Validators.minLength(3)]],
        })
      );
    }
  }
}
