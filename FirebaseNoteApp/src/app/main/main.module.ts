import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import {
  MatButtonModule,
  MatIconModule,
  MatListModule,
  MatSidenavModule,
  MatToolbarModule
} from '@angular/material';
import { CovalentLayoutModule } from '@covalent/core';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';

@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    CovalentLayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule
  ]
})
export class MainModule {}
