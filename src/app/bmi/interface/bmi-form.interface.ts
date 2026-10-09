import { FormControl } from '@angular/forms';

export interface BmiFormInterface {
  name: FormControl<string | null>;
  surname: FormControl<string | null>;
  age: FormControl<number | null>;
  weight: FormControl<number | null>;
  height: FormControl<number | null>;
  email: FormControl<string | null>;
  gender: FormControl<string | null>;
  consent: FormControl<boolean | null>;
}