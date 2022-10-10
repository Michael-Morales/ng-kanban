import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ButtonComponent } from './button/button.component';
import { ModalComponent } from './modal/modal.component';
import { MenuComponent } from './menu/menu.component';
import { InputComponent } from './input/input.component';
import { SelectComponent } from './select/select.component';
import { EmptyComponent } from './empty/empty.component';

@NgModule({
  declarations: [
    ButtonComponent,
    ModalComponent,
    MenuComponent,
    InputComponent,
    SelectComponent,
    EmptyComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [
    ButtonComponent,
    ModalComponent,
    MenuComponent,
    InputComponent,
    SelectComponent,
    EmptyComponent,
  ],
})
export class SharedModule {}
