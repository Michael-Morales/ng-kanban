import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { takeUntil, Subject } from 'rxjs';

import { ModalService } from '../../shared/modal.service';

import { selectAllBoards } from '../../store/selectors/boards.selectors';
import { createBoard } from '../../store/actions/boards.actions';
import { generateId } from '../../store/reducers/boards.reducer';

import { Board } from '../../interfaces';

@Component({
  selector: 'app-add-board',
  templateUrl: './add-board.component.html',
})
export class AddBoardComponent implements OnInit, OnDestroy {
  boards$?: Board[];
  newBoardId: number = generateId();
  addForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    columns: this.fb.array([]),
  });
  unsubscribe$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private modalService: ModalService,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.store
      .select(selectAllBoards)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((boards) => (this.boards$ = boards));
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  get columns() {
    return this.addForm.get('columns') as FormArray;
  }

  onDelete(index: number) {
    this.columns.removeAt(index);
  }

  onSave() {
    if (this.addForm.valid && this.boards$) {
      this.store.dispatch(
        createBoard({
          board: { id: this.newBoardId, name: this.addForm.get('name')?.value },
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
    this.columns.push(
      this.fb.group({
        id: [generateId(), Validators.required],
        boardId: [this.newBoardId, Validators.required],
        name: ['', [Validators.required, Validators.minLength(3)]],
      })
    );
  }
}
