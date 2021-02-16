import { Component, OnInit,EventEmitter, Renderer2,NgZone, ElementRef,HostListener,ViewChild } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';
import { ElectronService } from 'ngx-electron';
import { Userupdate } from '../updateuser';
import { NotificationsService } from 'angular2-notifications';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})


export class DashboardComponent implements OnInit {

public user = false;
public myItem = {};
public abc = true;
public data = [];
public notidatacount=0;
public notidatadisplay = false;
public notidata = [];
public isChecked = true;
public updateprofile = {};
public notifiation; 
public fname = '';
public fpath = '';
public uid: number;
public profilepic = 'default.jpg';


@ViewChild('check') check:ElementRef;
@ViewChild('toggleButton') toggleButton;
   @ViewChild('menu') menu;
   @ViewChild('htmlInsideModal') htmlInsideModal;
   @ViewChild('profileModal') profileModal;

   
  constructor(private router:Router, private _location:Location, private _electronservice:ElectronService, private _eref: ElementRef,private renderer: Renderer2,private zone:NgZone, private noti_service: NotificationsService) {

        /**
     * This events get called by all clicks on the page
     */
    this.renderer.listen('window', 'click',(e:Event)=>{
      /**
       * Only run when toggleButton is not clicked
       * If we don't check this, all clicks (even on the toggle button) gets into this
       * section which in the result we might never see the menu open!
       * And the menu itself is checked here, and it's where we check just outside of
       * the menu and button the condition abbove must close the menu
       */
      if(this.notidatadisplay){
     if(e.target !== this.toggleButton.nativeElement && e.target!==this.menu.nativeElement){
         this.notidatadisplay=false;
     }
    }
 });

   }
   
  



  ngOnInit(): void {
   
    if(localStorage.getItem('isLoggedIn') == "true"){
      this.abc = true;
     }else{
      this.abc = false;
     }
    this.myItem = localStorage.getItem('user');
    this.zone.run(()=>{
      this.notidatacount = 0;
      
     })

this.get_tab_data();

this._electronservice.ipcRenderer.send('isuserdata');

this._electronservice.ipcRenderer.on('isuserdata-reply',(erg,result)=>{
  this.updateprofile = new Userupdate(result[0].Id,result[0].Name,result[0].Email,result[0].company,result[0].Password);
  if(result[0].image != ''){
  this.profilepic = result[0].image;
  }
  this.uid = result[0].Id;
});


this.notifiation = {
  type: 'success',
  //title: 'dsd',
  content: 'Updated sucessfully !!',
  timeOut: 1500,
  showProgressBar: true,
  pauseOnHover: true,
  clickToClose: true,
  animate: 'fromRight'

}

  }

  
  openModal(){
    this.htmlInsideModal.open();
  }

  openProfilemodal(){
    this.profileModal.open();
  }
  
  checkCheckBoxvalue(event){
    this.isChecked = this.check.nativeElement.checked;
   }
  
  get_tab_data(){
    this._electronservice.ipcRenderer.send('tabletdata');

    this._electronservice.ipcRenderer.on('tabletdata-reply',(err,result)=>{

   this.zone.run(()=>{
    this.data = result;
     this.notidata =  this.data.filter(function(item) {
      return item.quantity == item.notiquantity;
  });
  
   })
 
    });
  }

  logout() {  
    console.log('logout');  
    localStorage.removeItem('token');
    localStorage.setItem('isLoggedIn','false'); 
    
    this.router.navigate(['/login']);  
  }





  

  backClicked() {
    this._location.back();
  }

  displaynotidata(){
    this.notidatadisplay = !this.notidatadisplay;
  }

  updateProfile(){

  this._electronservice.ipcRenderer.send('updateuser',this.updateprofile);
  console.log(this.updateprofile);

if(this.fname != '' && this.fpath != ''){
  this._electronservice.ipcRenderer.send('imagetest',{'id':this.uid, 'fname':this.fname,'path': this.fpath});
}

  this.noti_service.create('Profile', this.notifiation.content, this.notifiation.type);
  
  this.fname = '';
  this.fpath = '';

  }

//   handleFileInput(value){

// let length = value[0].name.split('.').length;
// let extension = value[0].name.split('.')[length-1];

// this.fname = 'profile'+Math.floor(Math.random() * 10000) + 1 +'.'+extension;
// this.fpath = value[0].path;



//   }

}


