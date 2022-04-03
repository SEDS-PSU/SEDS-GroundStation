import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RandomDataService {
  data: string[];

  constructor() { 
    this.data = Array<string>(4).fill(''); // set length based on number of valves
    setInterval(() => this.generateRandomData(), 1000);
  }

  generateRandomData(): void {
    for (let index = 0; index < this.data.length; index++) {
      this.data[index] = (Math.random() * 100).toFixed(3);
    }
  }
}
