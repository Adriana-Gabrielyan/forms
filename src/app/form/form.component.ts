import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MustMatch } from '../_helpers/match.validator';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  usersForm!: FormGroup;
  allowToAdd: boolean = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.usersForm = this.fb.group({
      users: this.fb.array([
        this.fb.group(
          {
            firstName: ['', [Validators.required, Validators.minLength(3)]],
            lastName: ['', [Validators.required, Validators.minLength(3)]],
            email: [
              '',
              [
                Validators.required,
                Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
              ],
            ],
            zip: ['', [Validators.required, Validators.maxLength(10)]],
            password: [
              '',
              [
                Validators.required,
                Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')
              ],
            ],
            confirm_password: [
              '',
              [Validators.required, Validators.minLength(6)],
            ],
          },
          {
            validator: MustMatch('password', 'confirm_password'),
          }
        ),
      ]),
    });
  }
  get userFormGroups() {
    return this.usersForm.get('users') as FormArray;
  }

  getValidity(i: any) {
    return (<FormArray>this.usersForm.get('users')).controls[i].invalid;
  }

  deleteForm(i: any) {
    let usersArray = this.usersForm.controls.users as FormArray;
    usersArray.removeAt(i);
  }

  addForm() {
    let usersArray = this.usersForm.controls.users as FormArray;
    let arraylen = usersArray.length;

    let newUsergroup: FormGroup = this.fb.group({
      firstName: ['', [Validators.minLength(3), Validators.required]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$')],
      zip: ['', [Validators.required, Validators.maxLength(10)]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')
        ],
      ],
      confirm_password: ['', [Validators.required, Validators.minLength(6)]],
    });
    this.allowToAdd = true;
    if (!this.getValidity(arraylen - 1)) {
      if (arraylen < 10) {
        usersArray.insert(arraylen, newUsergroup);
      } else {
        alert("You can't add more than 10 forms");
      }
    }
  }
  onSubmit() {
    if (!this.usersForm.invalid) {
      console.log(this.usersForm.value);
    }
  }
}
