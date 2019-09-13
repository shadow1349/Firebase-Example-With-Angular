import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { INote } from 'firebasenoteapptypes';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {
  @Input() note?: INote;
  @Output() update = new EventEmitter<INote>();
  @Output() delete = new EventEmitter<string>();

  noteForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.noteForm = fb.group({
      title: new FormControl(''),
      note: new FormControl('')
    });
  }

  ngOnInit() {
    if (this.note) {
      this.noteForm.get('title').setValue(this.note.Title);
      this.noteForm.get('note').setValue(this.note.Note);
      this.noteForm.disable();
    }
  }

  updateNote(event) {
    event.preventDefault();

    if (this.note === undefined) {
      this.note = {
        Id: '',
        Title: this.noteForm.get('title').value,
        Note: this.noteForm.get('note').value,
        Author: '',
        CreatedOn: 0
      };
    } else {
      this.note.Title = this.noteForm.get('title').value;
      this.note.Note = this.noteForm.get('note').value;
    }

    this.update.emit(this.note);
    this.noteForm.disable();
  }

  cancelNewNote() {
    this.update.emit(null);
  }

  deleteNote() {
    this.delete.emit(this.note.Id);
  }
}
