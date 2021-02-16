import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ElectronService } from 'ngx-electron';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  @ViewChild('useremail') useremail;
  public useremailreal;
  public notifys = false;
  public notifyerror = false;
  constructor(private router:Router, private electronservice:ElectronService ) { }

  ngOnInit(): void {
    this.electronservice.ipcRenderer.send('isuserdata');
    this.electronservice.ipcRenderer.on('isuserdata-reply',(err,result)=>{
      this.useremailreal = result[0].Email;
  });
  }

  
  loginf(){
   
     if(this.useremailreal === this.useremail.nativeElement.value){
       let pass = Math.random();
       let passnwe = pass.toString();

      this.electronservice.ipcRenderer.send('mail',{'email':this.useremailreal, 'password':passnwe});
    this.notifys = true;
    this.notifyerror = false;
     }else{
      this.notifys = false;
      this.notifyerror = true;

      console.log('false');
     }

  
  }

}
