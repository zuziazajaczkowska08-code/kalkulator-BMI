
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BmiFormInterface } from './interface/bmi-form.interface';
import { BmiService } from './interface/bmi-service';

@Component({
  selector: 'app-bmi',
  standalone: false,
  templateUrl: './bmi.component.html',
  styleUrl: './bmi.component.scss'
})
export class BmiComponent {
  constructor(private bmiService: BmiService) {}

  bmi: number | null = null;
  bmiDescription: string = '';

  userForm = new FormGroup<BmiFormInterface>({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    surname: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)]
    }),
    age: new FormControl<number | null>(null),
    weight: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(10)
    ]),
    height: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(100)
    ]),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email]
    }),
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

    this.bmiService.getBmi(weight, height).subscribe({
      next: (response) => {
        this.bmi = Math.round(response.bmi * 10) / 10;

        if (this.bmi < 18.5) {
          this.bmiDescription = 'Niedowaga';
        } else if (this.bmi < 25) {
          this.bmiDescription = 'Masa ciała w normie';
        } else if (this.bmi < 30) {
          this.bmiDescription = 'Nadwaga';
        } else {
          this.bmiDescription = 'Otyłość';
        }
      },
      error: (error) => {
        console.error('Błąd podczas obliczania BMI:', error);
      }
    });
  }
}
