import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  userForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      credentials: this.fb.array([]),
    });
    this.addForm();
  }
  trackByFn(index: any, item: any) {
    return index;
  }
  addForm() {
    const creds = this.userForm.controls.credentials as FormArray;
    creds.push(
      this.fb.group({
        firstName: ['', [Validators.required, Validators.minLength(3)]],
        lastName: ['', [Validators.required, Validators.minLength(3)]],
        email: [
          '',
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
        ],
        zip: ['', [Validators.required, Validators.maxLength(10)]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirm_password: ['', [Validators.required, Validators.minLength(6)]],
      })
    );
  }
  deleteForm(index: any) {
    console.log(index);
  }
  get credentials() {
    return this.userForm.get('credentials');
  }

  onSubmit() {
    console.log(this.userForm);
  }

  ngOnInit(): void {}
}
