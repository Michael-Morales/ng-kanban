import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent implements OnInit {
  @Input() label = '';
  @Input() type = 'text';
  @Input() control!: FormControl;
  @Input() controlType = 'input';
  @Input() placeholder = '';

  constructor() {}

  ngOnInit(): void {}
}