import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

import { Board } from '../../interfaces';

@Component({
  selector: 'app-edit-board',
  templateUrl: './edit-board.component.html',
  styleUrls: ['../add-board/add-board.component.css'],
})
export class EditBoardComponent implements OnInit {
  @Input() board?: Board;
  editForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.editForm = this.fb.group({
      name: [this.board?.name],
      columns: this.fb.array([]),
    });

    this.board?.columns.forEach((column) => {
      this.columns.push(
        this.fb.group({
          columnName: column.name,
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
    console.log('Save board');
  }

  onAddNewColumn() {
    this.columns.push(this.fb.group({ columnName: '' }));
  }
}
