import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BmiResponseInterface } from './bmi-responce.interface';

@Injectable({
  providedIn: 'root'
})
export class BmiService {
  url = "http://localhost:8080/api/bmi/"
  constructor(private http: HttpClient) { }

  getBmi(weight: number, height: number): Observable<BmiResponseInterface> {
    return this.http.get<BmiResponseInterface>(`${this.url}calculate?w=${weight}&h=${height}`);
  }
}