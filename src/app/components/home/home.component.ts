import { Component, OnInit, NgZone , Input, ViewChild, ElementRef, Output, EventEmitter, ChangeDetectorRef} from '@angular/core';
import { IpcRenderer } from 'electron';
import { Router } from '@angular/router';
import { ElectronService } from 'ngx-electron';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private ipc: IpcRenderer;
  public counttab = 0;
  public countcap = 0;
  public countsyp = 0;
  public countinj = 0;
  public countother = 0;
  public capsum = 0;
  public tabsum = 0;
  public sypsum = 0;
  public injsum = 0;
  public othersum = 0;
  public totalall = 0;
  public totalallcount = 0;
  public data = [];
  public isChecked = true;
  public count = 0;
 

  @ViewChild('check') check:ElementRef;
  @Output() sendToParent = new EventEmitter<boolean>();

  
  constructor(private router:Router, private _electronService:ElectronService, private zone:NgZone, private cd:ChangeDetectorRef) { }

  ngOnInit(): void {

   

    this._electronService.ipcRenderer.send('tabletdata');

    this._electronService.ipcRenderer.on('tabletdata-reply',(err,result)=>{
      this.cd.detectChanges();
      this.count++;
      
      if(this.count == 1){
     this.zone.run(()=>{
  
      this.data = result;

      for(let r of this.data){
  
        if(r.medicinetype == "tab"){
        
          this.tabsum = this.tabsum + (r.price*r.quantity);
          this.counttab = this.counttab + r.quantity;
        }
        if(r.medicinetype == "cap"){
      
          this.capsum = this.capsum + (r.price*r.quantity);
          this.countcap = this.countcap + r.quantity;
        }
        if(r.medicinetype == "syp"){
        
          this.sypsum = this.sypsum + (r.price*r.quantity);
          this.countsyp = this.countsyp + r.quantity;
        }
        if(r.medicinetype == "inj"){
      
          this.injsum = this.injsum + (r.price*r.quantity);
          this.countinj = this.countinj + r.quantity;
        }
        if(r.medicinetype == "other"){
       
          this.othersum = this.othersum + (r.price*r.quantity);
          this.countother = this.countother + r.quantity;
        }
    
      
        this.totalallcount = this.totalallcount + r.quantity;
        this.totalall = this.totalall + (r.price*r.quantity);
    
    
        }
    

     });

    }
  
     }
    
    )



  }





  checkCheckBoxvalue(event){
   this.isChecked = this.check.nativeElement.checked;
  }

 
 
  filterItemsOfType(){
    return this.data.filter(data => data.quantity == data.notiquantity);
  }
 



}
