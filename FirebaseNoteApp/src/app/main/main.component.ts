import { Component, HostListener, OnInit } from '@angular/core';
import { IUser } from 'firebasenoteapptypes';
import { Observable } from 'rxjs';
import { AuthService, UserService } from '../services';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  windowWidth = window.innerWidth;
  breakWidth = 800;

  user: Observable<IUser>;

  constructor(private userService: UserService, private auth: AuthService) {
    this.user = this.userService.user;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.windowWidth = window.innerWidth;
  }

  ngOnInit() {}

  signOut() {
    this.auth.signOut();
  }
}
