import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatToolbarModule
} from '@angular/material';
import { CovalentLayoutModule } from '@covalent/core';
import { NoteComponent } from './note.component';

@NgModule({
  declarations: [NoteComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CovalentLayoutModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule
  ],
  exports: [NoteComponent]
})
export class NoteModule {}
