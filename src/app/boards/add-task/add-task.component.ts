import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['../add-board/add-board.component.css'],
})
export class AddTaskComponent implements OnInit {
  addForm: FormGroup = this.fb.group({
    title: [''],
    description: [''],
    status: [''],
    subtasks: this.fb.array([
      this.fb.group({ title: [''], isComplete: [false] }),
    ]),
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  get subtasks() {
    return this.addForm.get('subtasks') as FormArray;
  }

  onDelete(index: number) {
    this.subtasks.removeAt(index);
  }

  onAddNewSubtask() {
    this.subtasks.push(
      this.fb.group({
        title: [''],
        isCompleted: [false],
      })
    );
  }

  onSave() {
    console.log('Creating new task');
  }
}
