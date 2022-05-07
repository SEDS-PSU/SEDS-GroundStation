import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MessengerService } from 'src/app/services/messenger.service';
import { CommunicationService } from 'src/app/services/communication.service';
import { CommTestService } from 'src/app/services/comm-test.service';
import { ThrowStmt } from '@angular/compiler';
import { DataSharingService } from 'src/app/services/data-sharing.service';

@Component({
  selector: 'app-data-display',
  templateUrl: './data-display.component.html',
  styleUrls: ['./data-display.component.scss'],
})
export class DataDisplayComponent implements OnInit {
  constructor(private dataSharing:DataSharingService, private dataService: DataService, private sanitizer: DomSanitizer, private commTest: CommTestService, private message:MessengerService) {
    commTest.messages.subscribe(async msg => {

      // NEEDS UPDATED
      //websocket in data display: ", msg);
      this.data[20] = (Math.round(Number(msg.TIMESTAMP) * 100) / 100).toString();
      this.data[0] = (Math.round(Number(msg.PT1_F) * 100) / 100).toString();
      this.data[1] = (Math.round(Number(msg.PT2_F) * 100) / 100).toString();
      this.data[2] = (Math.round(Number(msg.PT1_O) * 100) / 100).toString();
      this.data[3] = (Math.round(Number(msg.PT2_O) * 100) / 100).toString();
      this.data[4] = (Math.round(Number(msg.PT3_O) * 100) / 100).toString();
      this.data[5] = (Math.round(Number(msg.PT4_O) * 100) / 100).toString();
      this.data[6] = (Math.round(Number(msg.PT1_P) * 100) / 100).toString();
      this.data[7] = (Math.round(Number(msg.PT2_P) * 100) / 100).toString();
      this.data[8] = (Math.round(Number(msg.PT1_E) * 100) / 100).toString();
      this.data[9] = (Math.round(Number(msg.PT2_E) * 100) / 100).toString();
      this.data[10] = (Math.round(Number(msg.TC1_F) * 100) / 100).toString();
      this.data[11] = (Math.round(Number(msg.TC2_F) * 100) / 100).toString();
      this.data[12] = (Math.round(Number(msg.TC1_O) * 100) / 100).toString();
      this.data[13] = (Math.round(Number(msg.TC5_O) * 100) / 100).toString();
      this.data[14] = (Math.round(Number(msg.TC1_E) * 100) / 100).toString();
      this.data[15] = (Math.round(Number(msg.TC2_E) * 100) / 100).toString();
      this.data[16] = (Math.round(Number(msg.FM_F) * 100) / 100).toString();
      this.data[17] = (Math.round(Number(msg.FM_O) * 100) / 100).toString();
      this.data[18] = (Math.round(Number(msg.ThrustLoadCell) * 100) / 100).toString();
      this.data[19] = (Math.round(Number(msg.NitrousLoadCell) * 100) / 100).toString();
      // create a FileSystemWritableFileStream to write to
      this.TIME = this.TIME + 1;
      // write our file
      if(this.isRecording){
        let currFile = await this.newHandle.getFile();
        let currText = await currFile.text();
        let writeNext = "\n{\n\t\"TIMESTAMP\": " + String(this.data[20]) + "," + "\t" + 
                        "\n\t\"PT1_F\": " + String(this.data[0]) + "," + "\t" + 
                        "\n\t\"PT2_F\": " + String(this.data[1]) + "," + "\t" + 
                        "\n\t\"PT1_O\": " + String(this.data[2]) + "," + "\t" + 
                        "\n\t\"PT2_O\": " + String(this.data[3]) + "," + "\t" + 
                        "\n\t\"PT3_O\": " + String(this.data[4]) + "," + "\t" + 
                        "\n\t\"PT4_O\": " + String(this.data[5]) + "," + "\t" + 
                        "\n\t\"PT1_P\": " + String(this.data[6]) + "," + "\t" + 
                        "\n\t\"PT2_P\": " + String(this.data[7]) + "," + "\t" + 
                        "\n\t\"PT1_E\": " + String(this.data[8]) + "," + "\t" + 
                        "\n\t\"PT2_E\": " + String(this.data[9]) + "," + "\t" + 
                        "\n\t\"TC1_F\": " + String(this.data[10]) + "," + "\t" + 
                        "\n\t\"TC2_F\": " + String(this.data[11]) + "," + "\t" + 
                        "\n\t\"TC1_O\": " + String(this.data[12]) + "," + "\t" + 
                        "\n\t\"TC5_O\": " + String(this.data[13]) + "," + "\t" + 
                        "\n\t\"TC1_E\": " + String(this.data[14]) + "," + "\t" + 
                        "\n\t\"TC2_E\": " + String(this.data[15]) + "," + "\t" + 
                        "\n\t\"FM_F\": " + String(this.data[16]) + "," + "\t" + 
                        "\n\t\"FM_O\": " + String(this.data[17]) + "," + "\t" + 
                        "\n\t\"ThrustLoadCell\": " + String(this.data[18]) + "," + "\t" + 
                        "\n\t\"NitrousLoadCell\": " + String(this.data[19]) + "\n},"
                        + currText;
        let size = (await this.newHandle.getFile()).size;
        //console.log((await this.newHandle.getFile()).text)
        this.writableStream = await this.newHandle.createWritable();
        await this.writableStream.write({type: "write", position: 0, data: writeNext});
        await this.writableStream.close();
        let fileData = await this.newHandle.getFile();
        let contents = await fileData.text();
        //console.log(fileData);
        //console.log("File Data ", contents);
      }
    });
  }
  TIME = 0;
  newHandle;
  writableStream;
  isRecording = false;
  data: string[] = [];
  timeLeft: number = 5;
  interval;
  formData = new FormData();
  output = "";
  newTCData:[string, number][] = [
    ['TC1-F', 0],
    ['TC2-F', 0],
    ['TC1-O', 0],
    ['TC5-O', 0],
    ['TC1-E', 0],
    ['TC2-E', 0]
  ];

  public async dataCollection(){
    this.interval = setInterval(async () => {
      this.timeLeft += 1;
      this.output += this.dataService.data[0];
      document.getElementById('PT1-F').innerHTML = String(this.data[0]);
      document.getElementById('PT2-F').innerHTML = String(this.data[1]);
      document.getElementById('PT1-O').innerHTML = String(this.data[2]);
      document.getElementById('PT2-O').innerHTML = String(this.data[3]);
      document.getElementById('PT3-O').innerHTML = String(this.data[4]);
      document.getElementById('PT4-O').innerHTML = String(this.data[5]);
      document.getElementById('PT1-P').innerHTML = String(this.data[6]);
      document.getElementById('PT2-P').innerHTML = String(this.data[7]);
      document.getElementById('PT1-E').innerHTML = String(this.data[8]);
      document.getElementById('PT2-E').innerHTML = String(this.data[9]);
      document.getElementById('TC1-F').innerHTML = String(this.data[10]);
      document.getElementById('TC2-F').innerHTML = String(this.data[11]);
      document.getElementById('TC1-O').innerHTML = String(this.data[12]);
      document.getElementById('TC5-O').innerHTML = String(this.data[13]);
      document.getElementById('TC1-E').innerHTML = String(this.data[14]);
      document.getElementById('TC2-E').innerHTML = String(this.data[15]);
      document.getElementById('FM-F').innerHTML = String(this.data[16]);
      document.getElementById('FM-O').innerHTML = String(this.data[17]);
      document.getElementById('ThrustLoadCell').innerHTML = String(this.data[18]);
      document.getElementById('NitrousLoadCell').innerHTML = String(this.data[19]);

      //Updates values so they may be sent to the graphs:
      this.newTCData = [
        ['TC1-F', Number(this.dataService.data[3])],//Number(this.dataService.data[3])],
        ['TC2-F', Number(this.dataService.data[4])],
        ['TC1-O', Number(this.dataService.data[5])]
      ];

      this.message.sendToTCGraph(this.newTCData);

      
      //---- Writing data to a file
      // Creating the data
      
      const obj = {TC1_E: String(this.dataService.data[0]),
                   TC2_E: String(this.dataService.data[1])};
      const blob = new Blob([JSON.stringify(obj, null, 2)], {type : 'application/json'});
       
    },1000)
  }

  name = 'Angular 5';
  fileUrl;  

  // This is for testing
  public async recordDataStart(){
    let size = (await this.newHandle.getFile()).size;
    let currFile = await this.newHandle.getFile();
    let currText = await currFile.text();
    let writeNext = "Hello World\nHello World\nHello World\nHello World\nHello World\nHello World\nHello World\nHello World\nHello World\nHello World\n";
  
    this.writableStream = await this.newHandle.createWritable();
    await this.writableStream.write({
      type: "write", 
      position: size,
      data: writeNext
    });
    await this.writableStream.close();
    let fileData = await this.newHandle.getFile();
    let contents = await fileData.text();
    console.log(fileData);
    console.log("File Data ", contents);
  }

  // Stop recording data to the file
  public async recordDataStop(){
    this.isRecording = false;
    this.dataSharing.sendDataDownloading();
  }
  public async downloadData(){
    
  }

  ngOnInit(): void {
    this.dataCollection();
    var fileText = this.output;
    var fileName = "DATA_HERE.txt"
    var blob = new Blob([fileText], {type: 'text/plain'})
    this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
  }

  pickerOpts = {
    types: [
      {
        description: 'Images',
        accept: {
          'image/*': ['.png', '.gif', '.jpeg', '.jpg', '.txt']
        }
      },
    ],
    excludeAcceptAllOption: true,
    multiple: false
  };
  public async button() {
   this.newHandle = await window.showSaveFilePicker();
   this.dataSharing.sendDataDownloading();
   this.isRecording = true;
  }
  public async saveFile() {

  }
}
