import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SignInRoutingModule } from './sign-in-routing.module';
import { SignInComponent } from './sign-in.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { CovalentLayoutModule } from '@covalent/core';

@NgModule({
  declarations: [SignInComponent],
  imports: [
    CommonModule,
    SignInRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CovalentLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ]
})
export class SignInModule {}
