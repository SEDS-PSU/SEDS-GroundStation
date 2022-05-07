import { Injectable } from '@angular/core';
import { Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {
  private subject = new Subject<any>();
  private subject1 = new Subject<any>();
  private subject2 = new Subject<any>();

  sendToggleVerification(){
    this.subject.next();
  }
  getToggleVerificationEvent():Observable<any>{
    return this.subject.asObservable();
  }

  sendDataDownloading(){
    this.subject1.next();
  }
  getDataDownloadingEvent():Observable<any>{
    return this.subject1.asObservable();
  }

  sendConnection(){
    this.subject2.next();
  }
  getConnectionEvent():Observable<any>{
    return this.subject2.asObservable();
  }
}
