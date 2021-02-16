import { Component, ViewChild, OnInit, NgZone,ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { ElectronService, ElectronServiceRef } from 'ngx-electron';
import { MedicineserviceService } from '../../services/medicineservice.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import {Location} from '@angular/common';
import { PrimeNGConfig } from 'primeng/api';
import { fromEvent } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';
import { IfStmt } from '@angular/compiler';

@Component({
  selector: 'app-stock-review',
  templateUrl: './stock-review.component.html',
  styleUrls: ['./stock-review.component.css']
})
export class StockReviewComponent implements OnInit {

  public medicinedata = [];
  @ViewChild('search', { static: false }) search: any;
  public temp: Array<object> = [];
  public selected = [];
  public testdata = [];
  public alldata = [];
  public holdValue = '';
  // rows = [
  //   { name: 'Austin', gender: 'Male', company: 'Swimlane' },
  //   { name: 'Dany', gender: 'Male', company: 'KFC' },
  //   { name: 'Molly', gender: 'Female', company: 'Burger King' }
  // ];
  public count = 100;
  public pageSize = 3;
  public limit = 6;
  public offset = 0;
  columns = [ { name:'Medicine' ,prop: 'medicinename',width:100 }, { name: 'Batchno',prop: 'batchno', width:100  }, { name: 'Medicinetype', prop: 'medicinetype', width:100 }, { name: 'Mrp', prop: 'mrp', width:100 }, { name: 'Quantity', prop: 'quantity', width:100 }, { name: 'Pharmacy',prop: 'pharmacy', width:100 }, { name: 'Price', prop: 'price', width:100 }, { name: 'Expiry',prop: 'expiry', width:150 }];

  constructor(private _electronservice:ElectronService, private ngzone:NgZone, private medicineservice:MedicineserviceService, private router:Router,private _location:Location,private primengConfig: PrimeNGConfig,private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
  // console.log(this.table);
    // this.dataTable = $(this.table.nativeElement);
    // $('#datatable').dataTable();
    // $('#myTable').DataTable();
    this.primengConfig.ripple = true;
  this.get_data();

    }
    onActivate(event) {
      //console.log('Activate Event', event);
    }

    public changeLimit(event): void {
      this.limit = parseInt(event.target.value);
      console.log(this.limit);
    }

    public onPage(event): void {
      console.log(event);
      this.count = event.count;
      this.pageSize = event.pageSize;
      this.limit = event.limit;
      this.offset = event.offset;
    }
    onSelect({ selected }) {
      console.log('Select Event', selected, this.selected);
  
      this.selected.splice(0, this.selected.length);
      this.selected.push(...selected);
    }


    ngAfterViewInit(): void {
      // Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
      // Add 'implements AfterViewInit' to the class.
      fromEvent(this.search.nativeElement, 'keydown')
        .pipe(
          debounceTime(100),
          map(x => x['target']['value'])
        )
        .subscribe(value => {
          this.updateFilter(value);
        });
    }

    updateFilter(val: any) {
      const value = val.toString().toLowerCase().trim();
      // get the amount of columns in the table
      const count = this.columns.length;
      // get the key names of each column in the dataset
      const keys = Object.keys(this.temp[0]);
      // assign filtered matches to the active datatable
      this.medicinedata = this.temp.filter(item => {
        // iterate through each row's column data
        for (let i = 0; i < count; i++) {
          // check for a match
          if (
            (item[keys[i]] &&
              item[keys[i]]
                .toString()
                .toLowerCase()
                .indexOf(value) !== -1) ||
            !value
          ) {
            // found match, return true to add to result set
            return true;
          }
        }
      });
  
      // Whenever the filter changes, always go back to the first page
      // this.table.offset = 0;
    }


get_data(){
 

  this._electronservice.ipcRenderer.send('tabletdata');
    this._electronservice.ipcRenderer.on('tabletdata-reply',(e,result)=>{
    this.ngzone.run(()=>{
      this.temp = result;
      this.alldata = result;

if(this.holdValue == '' || this.holdValue == 'all'){
  this.medicinedata = [...this.temp];
  
}else{
  this.onItemChange(this.holdValue);

}

    
     
      
    })
    });
}



 delete(row){

  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
  
      this.ngzone.run(()=>{

      this._electronservice.ipcRenderer.send('delete-medicine',row.id);
      this.cd.detectChanges();
         this.get_data();
      
     

       


       
      })
      
      // Swal.fire(
      //   'Deleted!',
      //   'Your data has been deleted.',
      //   'success'
      // )
     
   
 
      
    }else{
      Swal.fire(
        'Dont worry!',
        'Your data is safe!!',
        'success'
      )
   
    }

  })
  
 }


 onItemChange(value){
 if(value == '1'){
  this.temp  = this.alldata.filter((item)=>{
if(item.quantity > 0){
    // console.log(new Date(item.expiry).getMonth()+1);
if(new Date(item.expiry).getFullYear()  == new Date().getFullYear()){
    return (new Date(item.expiry).getMonth() - new Date().getMonth()) == 1;
      }else if(new Date(item.expiry).getFullYear() == new Date().getFullYear()+1){
        return (new Date().getMonth() - new Date(item.expiry).getMonth()) == 11;
      }
    
  }
    });
      this.medicinedata = [...this.temp];
      this.holdValue = value;
 }
 
 if(value == '0'){
  this.temp = this.alldata.filter((item)=>{
    if(item.quantity > 0){
    if(new Date(item.expiry).getFullYear()  < new Date().getFullYear()){
    return new Date(item.expiry).getFullYear()  < new Date().getFullYear();
      }else if(new Date(item.expiry).getFullYear()  == new Date().getFullYear()){
        return new Date(item.expiry).getMonth() < new Date().getMonth();
      }
    }
    }
    );
      this.medicinedata = [...this.temp];

      this.holdValue = value;
 }
 if(value == '2'){
  this.temp  = this.alldata.filter((item)=>{
    // console.log(new Date(item.expiry).getMonth()+1);
    if(item.quantity > 0){
    if(new Date(item.expiry).getFullYear()  == new Date().getFullYear()){
      return (new Date(item.expiry).getMonth() - new Date().getMonth()) == 2;
        }else if(new Date(item.expiry).getFullYear() == new Date().getFullYear()+1){
          return (new Date().getMonth() - new Date(item.expiry).getMonth()) == 10;
        }
      }
      }
      );
      this.medicinedata = [...this.temp];

      this.holdValue = value;
 }
 if(value == '3'){
  this.temp  = this.alldata.filter((item)=>{
    // console.log(new Date(item.expiry).getMonth()+1);
    if(item.quantity > 0){
    if(new Date(item.expiry).getFullYear()  == new Date().getFullYear()){
      return (new Date(item.expiry).getMonth() - new Date().getMonth()) == 3;
        }else if(new Date(item.expiry).getFullYear() ==   new Date().getFullYear()+1){
          return (new Date().getMonth() - new Date(item.expiry).getMonth()) == 9;
        }
      }
      }
      );

      this.medicinedata = [...this.temp];
      this.holdValue = value;
 }
 if(value == 'all'){
 this.get_data();

 this.holdValue = value;
}
if(value == 'current'){
  this.temp  = this.alldata.filter((item)=>{
    if(item.quantity > 0){
    if(new Date(item.expiry).getFullYear()  == new Date().getFullYear()){
    return (new Date(item.expiry).getMonth() == new Date().getMonth());
      }
    }
    }
    );
      this.medicinedata = [...this.temp];

      this.holdValue = value;
 }

 }
  
}
