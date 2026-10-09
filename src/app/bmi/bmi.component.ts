import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BmiFormInterface } from './interface/bmi-form.interface';

@Component({
  selector: 'app-bmi',
  standalone: false,
  templateUrl: './bmi.component.html',
  styleUrl: './bmi.component.scss'
})
export class BmiComponent {
  bmi: number | null = null;

  userForm = new FormGroup<BmiFormInterface>({
    name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    surname: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(3)] }),
    age: new FormControl<number | null>(null),
    weight: new FormControl<number | null>(null, [Validators.required, Validators.min(10)]),
    height: new FormControl<number | null>(null, [Validators.required, Validators.min(100)]),
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    gender: new FormControl('', { nonNullable: true }),
    consent: new FormControl(true, { nonNullable: true })
  });

  submit(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    const weight = this.userForm.controls.weight.value;
    const height = this.userForm.controls.height.value;

    if (weight === null || height === null || height <= 0) {
      return;
    }

    this.bmi = Math.round((weight / ((height / 100) ** 2)) * 10) / 10;
  }
}