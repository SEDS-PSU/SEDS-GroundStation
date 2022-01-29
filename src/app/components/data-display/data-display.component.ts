import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-data-display',
  templateUrl: './data-display.component.html',
  styleUrls: ['./data-display.component.scss'],
})
export class DataDisplayComponent implements OnInit {
  constructor(private dataService: DataService, private sanitizer: DomSanitizer) {}

  timeLeft: number = 5;
  interval;
  formData = new FormData();
  output = "";
  public dataCollection(){
    this.interval = setInterval(() => {
      this.timeLeft += 1;
      this.output += this.dataService.data[0];
      document.getElementById('TC1-E').innerHTML = String(this.dataService.data[0]);
      document.getElementById('TC2-E').innerHTML = String(this.dataService.data[1]);
      document.getElementById('TC1-F').innerHTML = String(this.dataService.data[2]);
      document.getElementById('TC2-F').innerHTML = String(this.dataService.data[3]);
      document.getElementById('TC1-O').innerHTML = String(this.dataService.data[4]);
      document.getElementById('TC5-O').innerHTML = String(this.dataService.data[5]);
      document.getElementById('FM-F').innerHTML = String(this.dataService.data[7]);
      document.getElementById('FM-O').innerHTML = String(this.dataService.data[8]);
      document.getElementById('Load1').innerHTML = String(this.dataService.data[9]);
      document.getElementById('Load2').innerHTML = String(this.dataService.data[10]);
      document.getElementById('PT1-F').innerHTML = String(this.dataService.data[11]);
      document.getElementById('PT2-F').innerHTML = String(this.dataService.data[12]);
      document.getElementById('PT1-E').innerHTML = String(this.dataService.data[13]);
      document.getElementById('PT2-E').innerHTML = String(this.dataService.data[14]);
      document.getElementById('PT1-O').innerHTML = String(this.dataService.data[15]);
      document.getElementById('PT2-O').innerHTML = String(this.dataService.data[16]);
      document.getElementById('PT4-O').innerHTML = String(this.dataService.data[17]);
      document.getElementById('PT1-P').innerHTML = String(this.dataService.data[18]);
      document.getElementById('PT2-P').innerHTML = String(this.dataService.data[19]);
    },1000)
  }

  name = 'Angular 5';
  fileUrl;
  public recordDataStart(){}
  public recordDataStop(){}
  public downloadData(){
    //this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
  }



  ngOnInit(): void {
    this.dataCollection();
    var fileText = this.output;
    var fileName = "DATA_HERE.txt"
    var blob = new Blob([fileText], {type: 'text/plain'})
    this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
  }
}
