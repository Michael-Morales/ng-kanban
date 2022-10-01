import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

import { Board } from '../../interfaces';

@Component({
  selector: 'app-edit-menu',
  templateUrl: './edit-menu.component.html',
  styleUrls: ['./edit-menu.component.css'],
})
export class EditMenuComponent implements OnInit {
  @Input() board?: Board;
  editForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.editForm = this.fb.group({
      name: [this.board?.name],
      columns: this.fb.array([]),
    });

    const formArray = this.editForm.get('columns') as FormArray;

    this.board?.columns.forEach((column) => {
      formArray.push(
        this.fb.group({
          columnName: column.name,
        })
      );
    });
  }

  get columns() {
    return this.editForm.get('columns') as FormArray;
  }
}
