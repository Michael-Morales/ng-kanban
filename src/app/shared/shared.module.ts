import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonComponent } from './button/button.component';
import { ModalComponent } from './modal/modal.component';
import { MenuComponent } from './menu/menu.component';

@NgModule({
  declarations: [ButtonComponent, ModalComponent, MenuComponent],
  imports: [CommonModule],
  exports: [ButtonComponent, ModalComponent, MenuComponent],
})
export class SharedModule {}
