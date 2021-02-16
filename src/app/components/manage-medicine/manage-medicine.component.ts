import { Component, ViewChild, OnInit, NgZone,ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { MedicineserviceService } from '../../services/medicineservice.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import {Location} from '@angular/common';
import { PrimeNGConfig } from 'primeng/api';
import { fromEvent } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';
import { NotificationsService } from 'angular2-notifications';


declare var $;

@Component({
  selector: 'app-manage-medicine',
  templateUrl: './manage-medicine.component.html',
  styleUrls: ['./manage-medicine.component.css']
})
export class ManageMedicineComponent implements OnInit {
  // @ViewChild('dataTable') table:any;
  // dataTable: any;
  public medicinedata = [];
  
  @ViewChild('search', { static: false }) search: any;
  @ViewChild('quantityupdate') quantityupdate;
  @ViewChild('htmlInsideModal') htmlInsideModal;
  
  public temp: Array<object> = [];
  public selected = [];
  public testdata = [];
  // rows = [
  //   { name: 'Austin', gender: 'Male', company: 'Swimlane' },
  //   { name: 'Dany', gender: 'Male', company: 'KFC' },
  //   { name: 'Molly', gender: 'Female', company: 'Burger King' }
  // ];
  public count = 100;
  public pageSize = 3;
  public limit = 6;
  public offset = 0;
  public rowdata = [];
  columns = [ { name:'Medicine' ,prop: 'medicinename',width:100 }, { name: 'Batchno',prop: 'batchno', width:100  }, { name: 'Medicinetype', prop: 'medicinetype', width:100 }, { name: 'Mrp', prop: 'mrp', width:100 }, { name: 'Quantity', prop: 'quantity', width:100 }, { name: 'Pharmacy',prop: 'pharmacy', width:100 }, { name: 'Price', prop: 'price', width:100 }, { name: 'Expiry',prop: 'expiry', width:150 }];

  constructor(private _electronservice:ElectronService, private ngzone:NgZone, private medicineservice:MedicineserviceService, private router:Router,private _location:Location,private primengConfig: PrimeNGConfig,private cd: ChangeDetectorRef, private notifService:NotificationsService) { }

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
 
    }

    public onPage(event): void {
 
      this.count = event.count;
      this.pageSize = event.pageSize;
      this.limit = event.limit;
      this.offset = event.offset;
    }
    onSelect({ selected }) {

  
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

  this.testdata = result.filter((item)=>{
return new Date(item.expiry).getMonth()+1 < new Date().getMonth()+1;
  });

      this.medicinedata = [...this.temp];
     
      
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
 openModal(row){
  this.htmlInsideModal.open();
  this.rowdata = row;
 }
 updateQuantity(row){
   let totalq = parseInt(this.quantityupdate.nativeElement.value)+parseInt(row.quantity);
   this._electronservice.ipcRenderer.send('changequantity',{'id':row.id,'qunatity':totalq});


   this.get_data();
 Swal.fire(
        'Success!!',
        '<b>'+row.medicinename+'</b> quantity updated sucessfully.',
        'success'
      )

   this.htmlInsideModal.close();

 }




     
  }




