import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material';
import { NoteModule } from 'src/app/shared/note/note.module';
import { NotesRoutingModule } from './notes-routing.module';
import { NotesComponent } from './notes.component';

@NgModule({
  declarations: [NotesComponent],
  imports: [CommonModule, NotesRoutingModule, NoteModule, MatButtonModule]
})
export class NotesModule {}
