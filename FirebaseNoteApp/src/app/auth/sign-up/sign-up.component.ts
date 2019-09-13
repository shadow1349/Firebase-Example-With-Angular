import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { IUser } from 'firebasenoteapptypes';
import { AuthService } from 'src/app/services';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService) {
    this.signUpForm = this.fb.group({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {}

  signUp() {
    const user: IUser = {
      Id: '',
      FirstName: this.signUpForm.get('firstName').value,
      LastName: this.signUpForm.get('lastName').value,
      Email: this.signUpForm.get('email').value,
      EmailVerified: false,
      Disabled: false,
      NumNotes: 0,
      ProfilePhoto: '',
      FCMToken: '',
      CreatedOn: 0,
    };

    this.auth.signUp(user, this.signUpForm.get('password').value);
  }
}
