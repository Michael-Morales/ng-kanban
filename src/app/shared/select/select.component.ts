import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { BoardsService } from 'src/app/boards/boards.service';

import { Column } from '../../interfaces';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
})
export class SelectComponent implements OnInit {
  @Input() control!: FormControl;
  columns?: Column[];

  constructor(
    private route: ActivatedRoute,
    private boardService: BoardsService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.boardService
        .getBoardColumns(params.get('id'))
        .subscribe((columns) => (this.columns = columns));
    });
  }
}
