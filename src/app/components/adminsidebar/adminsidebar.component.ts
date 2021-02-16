import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MedicineserviceService } from '../../services/medicineservice.service';



@Component({
  selector: 'app-adminsidebar',
  templateUrl: './adminsidebar.component.html',
  styleUrls: ['./adminsidebar.component.css']
})
export class AdminsidebarComponent implements OnInit {
public uname:string;
  constructor(private router: Router, private route: ActivatedRoute, private medicineservice:MedicineserviceService) { }

  ngOnInit(): void {
    this.uname = localStorage.getItem('name');
 
    

  
  }

 

}
