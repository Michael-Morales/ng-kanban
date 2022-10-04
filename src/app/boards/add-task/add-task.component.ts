import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

import { BoardsService } from '../boards.service';

import { Board, Column } from '../../interfaces';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['../add-board/add-board.component.css'],
})
export class AddTaskComponent implements OnInit {
  @Input() board?: Board;
  columns?: Column[];
  addForm: FormGroup = this.fb.group({
    title: [''],
    description: [''],
    status: [''],
    subtasks: this.fb.array([
      this.fb.group({ title: [''], isComplete: [false] }),
    ]),
  });

  constructor(private fb: FormBuilder, private boardsService: BoardsService) {}

  ngOnInit(): void {
    this.boardsService
      .getBoardColumns(this.board?.id)
      .subscribe((columns) => (this.columns = columns));
  }

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
