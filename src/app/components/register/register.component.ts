import { Component, OnInit } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
public registerUser = {

  'username':'',
  'email':'',
  'companyname': '',
  'cpassword': '',
  'password' : ''





};
  constructor(private _electronService:ElectronService, private router:Router) { }

  ngOnInit(): void {



  }

  register(){

this._electronService.ipcRenderer.send('insertuser',this.registerUser);

this.router.navigateByUrl('');

  }

}
