import { Component, OnInit } from '@angular/core';
import { INote, IUser } from 'firebasenoteapptypes';
import { Observable } from 'rxjs';
import { NotesService, UserService } from 'src/app/services';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  user: Observable<IUser>;
  notes: Observable<INote[]>;

  newNote = false;

  constructor(
    private noteService: NotesService,
    private userService: UserService
  ) {
    this.user = this.userService.user;
    this.notes = this.noteService.notes;
  }

  ngOnInit() {}

  updateNote(note: INote) {
    this.noteService.updateNote(note);
  }

  createNote(note: INote, userId: string) {
    if (note === null) {
      this.newNote = false;
    } else {
      note.Author = userId;
      this.noteService.addNote(note);
      this.newNote = false;
    }
  }

  deleteNote(id: string) {
    this.noteService.deleteNote(id);
  }
}
