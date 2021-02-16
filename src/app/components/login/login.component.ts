import { Component, OnInit ,NgZone } from '@angular/core';
import { User } from '../user';
import { IpcRenderer } from 'electron';
import { Router } from '@angular/router';
import { ElectronService } from 'ngx-electron';
declare var electron: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private ipc: IpcRenderer
  public error = false;


  constructor(private zone:NgZone, private router:Router, private _electronService: ElectronService) {

    if ((<any>window).require) {
      try {
        this.ipc = (<any>window).require('electron').ipcRenderer;
      } catch (e) {
        throw e;
      }
    } else {
      console.warn('App not running inside Electron!');
    }

   }

  ngOnInit(): void {
 
    this._electronService.ipcRenderer.send('isuserdata');
    this._electronService.ipcRenderer.on('isuserdata-reply',(e,result)=>{
     
    if(result.length < 1){
   
      this.zone.run(()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        localStorage.setItem('isLoggedIn','false'); 
        this.router.navigateByUrl('/register');
      });
     
    }
    });

    if(localStorage.getItem('isLoggedIn') == "true"){
      this.router.navigateByUrl('/dashboard/home');
    }

  }

  userModel = new User('','');
  login(){

    this._electronService.ipcRenderer.send('login',this.userModel);
 
this.ipc.on('login-reply',(e,arg)=>{
if(arg.length > 0){
  this.zone.run(()=>{
    localStorage.setItem('isLoggedIn', "true");  
    for(let u of arg){
      localStorage.setItem('token', u.Id);
      localStorage.setItem('name', u.Name);
      
    }
      

    this.router.navigateByUrl('/dashboard/home');
  });
  
}else{
  this.zone.run(()=>{
    this.error = true;
  });

}
});
  }

}
