import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
})
export class ButtonComponent implements OnInit {
  @Input() buttonType = 'button';
  @Input() buttonStyle = [''];
  @Input() disabled = false;

  constructor() {}

  ngOnInit(): void {}
}
