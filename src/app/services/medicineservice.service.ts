import { Injectable, NgZone } from '@angular/core';
import { IpcRenderer } from 'electron';
import { Router } from '@angular/router';
import { ElectronService } from 'ngx-electron';
import { User } from '../components/user';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Medicine } from '../interfaces/medicine';

@Injectable({
  providedIn: 'root'
})
export class MedicineserviceService {
  public data:any;
  private api = 'https://jsonplaceholder.typicode.com/todos/1'; 
  constructor(private router:Router, private _electronService:ElectronService, private zone:NgZone, private http: HttpClient) { }
  medicinealldata():Observable<any>{
    return this.http.get<any>(this.api);

  }
 
}
