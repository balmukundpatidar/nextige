import { Component, OnInit, NgZone } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { Router, ActivatedRoute} from '@angular/router';
import { Medicine } from '../medicine';
import {Location} from '@angular/common';

@Component({
  selector: 'app-edit-medicine',
  templateUrl: './edit-medicine.component.html',
  styleUrls: ['./edit-medicine.component.css']
})
export class EditMedicineComponent implements OnInit {
public editdata = [];
 public addMedicine = new Medicine(null,'','',null,null,'',null,null,'','');
  constructor(private router:Router, private activateroute:ActivatedRoute, private _electronservice:ElectronService, private zone:NgZone, private _location:Location) { }

  ngOnInit(): void {
    this._electronservice.ipcRenderer.send('editmedicinedata',this.activateroute.snapshot.params.id);
    this._electronservice.ipcRenderer.on('editmedi-reply',(evt,result)=>{
      this.zone.run(
        ()=>{
          for(let r of result){
            this.addMedicine = new Medicine(r.id,r.medicinename,r.batchno,r.quantity,r.notiquantity,r.medicinetype,r.mrp,r.price,r.expiry,r.pharmacy);
          }
        }
      )




    });
    
  }
  update(){
    this._electronservice.ipcRenderer.send('updatemedicine',this.addMedicine);
    this._location.back();
  }
}
