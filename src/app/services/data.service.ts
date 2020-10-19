import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private a: number; // result should be 1999
  private b: number; // result should be 617
  private c: number; // result should be -56

  constructor(private http: HttpClient) {
    this.a = 0;
    this.b = 0;
    this.c = 0;
    this.http.get('assets/data/fake_data.txt', {responseType: 'text'})
      .subscribe(data => this.parseData(data));
  }

  parseData(data: string): void {
    // code goes here, use console.log() to check values of a, b, and c
  }
}
