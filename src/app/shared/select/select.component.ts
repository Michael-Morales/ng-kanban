import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

import { Column, IColumn } from '../../interfaces';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
})
export class SelectComponent implements OnInit {
  @Input() control!: FormControl;
  @Input() columns?: Column[] | IColumn[] | null;

  constructor() {}

  ngOnInit(): void {}
}
