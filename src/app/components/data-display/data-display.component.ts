import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MessengerService } from 'src/app/services/messenger.service';
import { CommunicationService } from 'src/app/services/communication.service';
import { CommTestService } from 'src/app/services/comm-test.service';
import { ThrowStmt } from '@angular/compiler';
//import { FileSystemFileHandle } from 'file-system-access';


@Component({
  selector: 'app-data-display',
  templateUrl: './data-display.component.html',
  styleUrls: ['./data-display.component.scss'],
})
export class DataDisplayComponent implements OnInit {
  constructor(private dataService: DataService, private sanitizer: DomSanitizer, private commTest: CommTestService, private message:MessengerService) {
    commTest.messages.subscribe(msg => {

      // NEEDS UPDATED
      console.log("Response from websocket in data display: ", msg);
      this.data[0] = (Math.round(Number(msg.PT1_F) * 100) / 100).toString();
      this.data[1] = (Math.round(Number(msg.PT2_F) * 100) / 100).toString();
      this.data[2] = (Math.round(Number(msg.PT1_O) * 100) / 100).toString();
      this.data[3] = (Math.round(Number(msg.PT2_O) * 100) / 100).toString();
      this.data[4] = (Math.round(Number(msg.PT4_O) * 100) / 100).toString();
      this.data[5] = (Math.round(Number(msg.PT1_P) * 100) / 100).toString();
      this.data[6] = (Math.round(Number(msg.PT2_P) * 100) / 100).toString();
      this.data[7] = (Math.round(Number(msg.PT1_E) * 100) / 100).toString();
      this.data[8] = (Math.round(Number(msg.PT2_E) * 100) / 100).toString();
      this.data[9] = (Math.round(Number(msg.TC1_F) * 100) / 100).toString();
      this.data[10] = (Math.round(Number(msg.TC2_F) * 100) / 100).toString();
      this.data[11] = (Math.round(Number(msg.TC1_O) * 100) / 100).toString();
      this.data[12] = (Math.round(Number(msg.TC5_O) * 100) / 100).toString();
      this.data[13] = (Math.round(Number(msg.TC1_E) * 100) / 100).toString();
      this.data[14] = (Math.round(Number(msg.TC2_E) * 100) / 100).toString();
      this.data[15] = (Math.round(Number(msg.FM_F) * 100) / 100).toString();
      this.data[16] = (Math.round(Number(msg.FM_O) * 100) / 100).toString();
      this.data[17] = (Math.round(Number(msg.ThrustLoadCell) * 100) / 100).toString();
      this.data[18] = (Math.round(Number(msg.ThrustLoadCell) * 100) / 100).toString();

    });
  }
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
      document.getElementById('TC1-E').innerHTML = String(this.dataService.data[0]);
      document.getElementById('TC2-E').innerHTML = String(this.data[1]);
      document.getElementById('TC1-F').innerHTML = String(this.data[2]);
      document.getElementById('TC2-F').innerHTML = String(this.data[3]);
      document.getElementById('TC1-O').innerHTML = String(this.data[4]);
      document.getElementById('TC5-O').innerHTML = String(this.data[5]);
      document.getElementById('FM-F').innerHTML = String(this.data[6]);
      document.getElementById('FM-O').innerHTML = String(this.data[7]);
      document.getElementById('Load1').innerHTML = String(this.data[8]);
      document.getElementById('Load2').innerHTML = String(this.data[9]);
      document.getElementById('PT1-F').innerHTML = String(this.data[10]);
      document.getElementById('PT2-F').innerHTML = String(this.data[11]);
      document.getElementById('PT1-E').innerHTML = String(this.data[12]);
      document.getElementById('PT2-E').innerHTML = String(this.data[13]);
      document.getElementById('PT1-O').innerHTML = String(this.data[14]);
      document.getElementById('PT2-O').innerHTML = String(this.data[15]);
      document.getElementById('PT4-O').innerHTML = String(this.data[16]);
      document.getElementById('PT1-P').innerHTML = String(this.data[17]);
      document.getElementById('PT2-P').innerHTML = String(this.data[18]);

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
  
      // create a FileSystemWritableFileStream to write to
    
      // write our file
      if(this.isRecording){
        let currFile = await this.newHandle.getFile();
        let currText = await currFile.text();
        let writeNext = "\n{\n\tTC1-E: " + String(this.dataService.data[0]) + "\t" + 
                        "\n\tTC2-E: " + String(this.dataService.data[1]) + "\t" + 
                        "\n\tTC1-F: " + String(this.dataService.data[2]) + "\t" + 
                        "\n\tTC1-F: " + String(this.dataService.data[3]) + "\n},"
                        + currText;
        let size = (await this.newHandle.getFile()).size;
        console.log((await this.newHandle.getFile()).text)
        this.writableStream = await this.newHandle.createWritable();
        await this.writableStream.write({type: "write", position: 0, data: writeNext});
        await this.writableStream.close();
        let fileData = await this.newHandle.getFile();
        let contents = await fileData.text();
        console.log(fileData);
        console.log("File Data ", contents);
      }
        
      // close the file and write the contents to disk.
  
      

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
   this.isRecording = true;
  }
  public async saveFile() {

  }
}
