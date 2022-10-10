import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { BoardsService } from '../boards.service';
import { ModalService } from 'src/app/shared/modal.service';

@Component({
  selector: 'app-add-board',
  templateUrl: './add-board.component.html',
  styleUrls: ['./add-board.component.css'],
})
export class AddBoardComponent implements OnInit {
  addForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    columns: this.fb.array([]),
  });

  constructor(
    private fb: FormBuilder,
    private boardsService: BoardsService,
    private modalService: ModalService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  get columns() {
    return this.addForm.get('columns') as FormArray;
  }

  onDelete(index: number) {
    this.columns.removeAt(index);
  }

  onSave() {
    if (this.addForm.valid) {
      const id = this.boardsService.createBoard(this.addForm.value);
      this.modalService.closeModal();
      this.router.navigateByUrl('/boards/' + id);
    }
  }

  onAddNewColumn() {
    this.columns.push(
      this.fb.group({
        name: ['', [Validators.required, Validators.minLength(3)]],
      })
    );
  }
}
