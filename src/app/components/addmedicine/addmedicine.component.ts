import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { Medicine } from '../medicine';
import { IpcRenderer } from 'electron';
import { ElectronService } from 'ngx-electron';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NgForOf } from '@angular/common';
import { NgForm } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';


@Component({
  selector: 'app-addmedicine',
  templateUrl: './addmedicine.component.html',
  styleUrls: ['./addmedicine.component.css']
})
export class AddmedicineComponent implements OnInit {
  @ViewChild('medicineform') medicineform:NgForm;
public notifiation;
addMedicine = new Medicine(null,'','',null,null,'',null,null,'','');
  constructor(private _electronService: ElectronService, private zone:NgZone, private router: Router, private _service: NotificationsService) { }


  ngOnInit(): void {
    this.notifiation = {
        type: 'success',
        //title: 'dsd',
        content: 'is added!!',
        timeOut: 1500,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true,
        animate: 'fromRight'
    
      }
      }
    


  insertmedicine(form:NgForm){
   
   this._electronService.ipcRenderer.send('insertmedicine',this.addMedicine);
   this._electronService.ipcRenderer.on('insertmedi-reply',(err,result)=>{

   });
  //  Swal.fire({
  //    html: 
  //    'Added' + this.addMedicine.medicinename

  //  });

 
    this._service.create(this.addMedicine.medicinename, this.notifiation.content, this.notifiation.type)
    // this.medicineform.reset();

  }



 

 
 

}
