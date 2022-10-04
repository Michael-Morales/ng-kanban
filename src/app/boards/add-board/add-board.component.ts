import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-add-board',
  templateUrl: './add-board.component.html',
  styleUrls: ['./add-board.component.css'],
})
export class AddBoardComponent implements OnInit {
  addForm: FormGroup = this.fb.group({
    name: [''],
    columns: this.fb.array([this.fb.group({ columnName: '' })]),
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  get columns() {
    return this.addForm.get('columns') as FormArray;
  }

  onDelete(index: number) {
    this.columns.removeAt(index);
  }

  onSave() {
    console.log('Creating new board');
  }

  onAddNewColumn() {
    this.columns.push(this.fb.group({ columnName: '' }));
  }
}
