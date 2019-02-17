import { NgModule } from '@angular/core';

import {
  MatButtonModule,
  MatCardModule,
  MatTableModule,
  MatToolbarModule
} from '@angular/material';
@NgModule({
  imports: [MatButtonModule, MatCardModule, MatTableModule, MatToolbarModule],
  exports: [MatButtonModule, MatCardModule, MatTableModule, MatToolbarModule]
})
export class AngularMaterialModule {}
