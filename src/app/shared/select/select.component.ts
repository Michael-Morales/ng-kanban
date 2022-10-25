import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

import { IColumn } from '../../interfaces';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
})
export class SelectComponent implements OnInit {
  @Input() control!: FormControl;
  @Input() columns!: IColumn[] | null;

  constructor() {}

  ngOnInit(): void {}
}
