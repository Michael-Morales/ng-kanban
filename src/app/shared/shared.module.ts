import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonComponent } from './button/button.component';
import { ModalComponent } from './modal/modal.component';
import { MenuComponent } from './menu/menu.component';
import { DeleteMenuComponent } from './delete-menu/delete-menu.component';

@NgModule({
  declarations: [
    ButtonComponent,
    ModalComponent,
    MenuComponent,
    DeleteMenuComponent,
  ],
  imports: [CommonModule],
  exports: [
    ButtonComponent,
    ModalComponent,
    MenuComponent,
    DeleteMenuComponent,
  ],
})
export class SharedModule {}
