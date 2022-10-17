import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { ModalService } from 'src/app/shared/modal.service';

import {
  selectAllBoards,
  selectColumns,
} from '../../store/selectors/boards.selectors';

import { createBoard } from '../../store/actions/boards.actions';

import { Board, IColumn } from '../../interfaces';

@Component({
  selector: 'app-add-board',
  templateUrl: './add-board.component.html',
  styleUrls: ['./add-board.component.css'],
})
export class AddBoardComponent implements OnInit {
  boards$?: Board[];
  columns$?: IColumn[];
  addForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    columns: this.fb.array([]),
  });

  constructor(
    private fb: FormBuilder,
    private modalService: ModalService,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.store
      .select(selectAllBoards)
      .subscribe((boards) => (this.boards$ = boards));

    this.store
      .select(selectColumns)
      .subscribe((columns) => (this.columns$ = columns));
  }

  get columns() {
    return this.addForm.get('columns') as FormArray;
  }

  onDelete(index: number) {
    this.columns.removeAt(index);
  }

  onSave() {
    if (this.addForm.valid && this.boards$) {
      const newId = this.boards$[this.boards$.length - 1].id + 1;

      this.store.dispatch(
        createBoard({
          board: { id: newId, name: this.addForm.get('name')?.value },
          columns: this.addForm.get('columns')?.value,
        })
      );
      this.modalService.closeModal();
      this.router.navigateByUrl(
        '/boards/' + this.boards$[this.boards$.length - 1].id
      );
    }
  }

  onAddNewColumn() {
    if (this.boards$) {
      const getNewColumnId = (): number | void => {
        if (this.columns$) {
          if (!this.columns.length) {
            return this.columns$[this.columns$.length - 1].id + 1;
          } else {
            return (
              this.addForm.get('columns')?.value[this.columns.length - 1].id + 1
            );
          }
        }
      };

      const newBoardId = this.boards$[this.boards$.length - 1].id + 1;

      this.columns.push(
        this.fb.group({
          id: [getNewColumnId(), Validators.required],
          boardId: [newBoardId, Validators.required],
          name: ['', [Validators.required, Validators.minLength(3)]],
        })
      );
    }
  }
}
