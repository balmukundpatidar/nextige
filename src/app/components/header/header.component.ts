import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { Router } from '@angular/router';
import { ElectronService } from 'ngx-electron';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public abc = false;
  public data = [];
  constructor(private _location: Location, private router:Router, private _electronservice:ElectronService) { }

  ngOnInit(): void {

 if(localStorage.getItem('isLoggedIn') == "true"){
  this.abc = true;
 }else{
  this.abc = false;
 }



  }


 


 
}
