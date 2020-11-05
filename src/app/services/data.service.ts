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

    //Is this the what you're looking for so far? I still need to add a few things like importing the text file, etc...

    "use strict";                      //IDE added this 
    exports.__esModule = true;          //IDE also added this
    function calculate(letter, operator, number) {
      if (operator == 'add') {
        return letter += number;
      }
      if (operator == 'sub') {
        return letter -= number;
      }
      if (operator == 'mult') {
        return letter *= number;
      }
      if (operator == 'div') {
        return letter /= number;
      }
    }

    var splitting = data.split(';');
    var a = 0;
    var b = 0;
    var c = 0;
    for (var i = 0; i < splitting.length; i++) {
      var temp = splitting[i].split('_');
      var opr = temp[0];
      var temp2 = temp[1].split(':');
      var letter = temp2[0];
      var num = +temp2[1];
      if (letter == 'a') {
        a = calculate(a, opr, num);
      }
      if (letter == 'b') {
        b = calculate(b, opr, num);
      }
      if (letter == 'c') {
        c = calculate(c, opr, num);
      }
    }
    console.log("a: " + a + " b: " + b + " c: " + c);

  }
}
