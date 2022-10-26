import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
})
export class ButtonComponent implements OnInit {
  @Input() buttonType = 'button';
  @Input() disabled = false;
  @Input() primary = false;
  @Input() secondary = false;
  @Input() danger = false;
  @Input() small = false;
  @Input() standard = false;

  constructor() {}

  ngOnInit(): void {}
}
