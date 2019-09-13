import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatCardModule, MatSidenavModule } from '@angular/material';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';

@NgModule({
  declarations: [AuthComponent],
  imports: [CommonModule, AuthRoutingModule, MatSidenavModule, MatCardModule]
})
export class AuthModule {}
