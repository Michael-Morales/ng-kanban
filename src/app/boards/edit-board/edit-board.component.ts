import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { takeUntil, Subject } from 'rxjs';

import { ModalService } from 'src/app/shared/modal.service';

import { selectAllBoards } from '../../store/selectors/boards.selectors';

import { updateBoard, deleteColumn } from '../../store/actions/boards.actions';

import { generateId } from '../../store/reducers/boards.reducer';

import { Board } from '../../interfaces';

@Component({
  selector: 'app-edit-board',
  templateUrl: './edit-board.component.html',
})
export class EditBoardComponent implements OnInit, OnDestroy {
  @Input() boardId?: number;
  board$?: Board;
  editForm!: FormGroup;
  unsubscribe$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private modalService: ModalService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.store
      .select(selectAllBoards)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (boards) =>
          (this.board$ = boards.find((board) => board.id === this.boardId))
      );

    this.editForm = this.fb.group({
      id: [this.boardId, Validators.required],
      name: [this.board$?.name, [Validators.required, Validators.minLength(3)]],
      columns: this.fb.array([]),
    });

    this.board$?.columns.forEach((column) => {
      this.columns.push(
        this.fb.group({
          id: [column.id, Validators.required],
          boardId: [column.boardId, Validators.required],
          name: [column.name, [Validators.required, Validators.minLength(3)]],
        })
      );
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  get columns() {
    return this.editForm.get('columns') as FormArray;
  }

  onDelete(index: number, id: number) {
    this.columns.removeAt(index);
    this.store.dispatch(deleteColumn({ id }));
  }

  onSave() {
    if (this.editForm.valid && this.board$) {
      this.store.dispatch(
        updateBoard({
          board: {
            id: this.board$.id,
            changes: { name: this.editForm.get('name')?.value },
          },
          columns: this.columns.value,
        })
      );

      this.modalService.closeModal();
    }
  }

  onAddNewColumn() {
    this.columns.push(
      this.fb.group({
        id: [generateId(), Validators.required],
        boardId: [this.boardId, Validators.required],
        name: ['', [Validators.required, Validators.minLength(3)]],
      })
    );
  }
}
