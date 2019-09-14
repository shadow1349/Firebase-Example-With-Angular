import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { IUser } from 'firebasenoteapptypes';
import { Observable, Subscription } from 'rxjs';
import { AuthService, UserService } from 'src/app/services';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnDestroy {
  user: Observable<IUser>;
  profileForm: FormGroup;

  subscription = new Subscription();

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private auth: AuthService
  ) {
    this.user = this.userService.user;

    this.profileForm = this.fb.group({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required])
    });

    this.profileForm.disable();

    this.subscription.add(
      this.userService.user.subscribe(u => {
        this.profileForm.get('firstName').setValue(u.FirstName);
        this.profileForm.get('lastName').setValue(u.LastName);
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  updateName(id: string) {
    this.userService.update({
      Id: id,
      FirstName: this.profileForm.get('firstName').value,
      LastName: this.profileForm.get('lastName').value
    });

    this.profileForm.disable();
  }

  uploadProfilePhoto(files: FileList, userId: string) {
    if (files.length > 1) {
      Swal.fire(
        'Too many files',
        'You can only upload a single file',
        'warning'
      );
    } else {
      const file = files.item(0);

      if (!file.type.includes('image')) {
        return Swal.fire({
          title: 'Unsupported File Format',
          text: 'We only support image files for profile photos.',
          type: 'warning'
        });
      }

      this.userService.uploadProfilePhoto(userId, files.item(0));
    }
  }

  changePassword(email: string) {
    this.auth.changePassword(email);
  }

  deleteAccount(id: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This will permananetly delete your account and all notes',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then(result => {
      if (result.value) {
        this.userService.delete(id);
      }
    });
  }
}
