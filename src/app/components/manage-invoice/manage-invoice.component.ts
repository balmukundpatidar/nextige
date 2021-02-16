import { Component, OnInit, ViewChild, NgZone,AfterViewInit } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { fromEvent } from 'rxjs';
import Swal from 'sweetalert2';
import { map, debounceTime } from 'rxjs/operators';
import { globalAgent } from 'http';
import {formatDate} from '@angular/common';
import pdfMake from "pdfmake/build/pdfmake";  
import pdfFonts from "pdfmake/build/vfs_fonts"; 
pdfMake.vfs = pdfFonts.pdfMake.vfs; 
@Component({
  selector: 'app-manage-invoice',
  templateUrl: './manage-invoice.component.html',
  styleUrls: ['./manage-invoice.component.css']
})
export class ManageInvoiceComponent implements OnInit {

  constructor(private _electronservice:ElectronService, private ngzone:NgZone) { }
  @ViewChild('search', { static: false }) search: any;
  @ViewChild('htmlInsideModal') htmlInsideModal;
  public temp: Array<object> = [];
  public selected = [];
public invoicedata = [];
  public count = 100;
  public pageSize = 3;
  public limit = 6;
  public offset = 0;
  public medirow = [];
  public mediquantity = [];
  public alld = {};
  public rowdata = {};
  public mediid = [];
  public medimrp = [];
  public meditoalamount = [];
  public showdate;
  public pfddataobj = {};
  public pdfdataarray = [];
  public companyname = 'Dummy company';

  
  


  columns = [ { name:'Invoice Id' ,prop: 'id',width:100 }, { name: 'To',prop: 'name', width:100  },{ name: 'Medicine',prop: 'medicine_name', width:200  },{ name: 'Quantity',prop: 'medicine_quantity', width:100  }, { name: 'MRP',prop: 'medicine_mrp', width:100  },{ name: 'Total amount',prop: 'total_amount', width:100  }, { name: 'Date', prop: 'date',  width:100}];

  ngOnInit(): void {

    

    this._electronservice.ipcRenderer.send('isuserdata');

    this._electronservice.ipcRenderer.on('isuserdata-reply',(e,result)=>{
       this.companyname = result[0].company;
    });

    this.get_data();
  
  }

  onActivate(event) {
    //console.log('Activate Event', event);
  }


  get_data(){
 

    this._electronservice.ipcRenderer.send('invoicedata');
      this._electronservice.ipcRenderer.on('invoicedata-reply',(e,result)=>{
      this.ngzone.run(()=>{
        this.temp = result;
      
        this.invoicedata = [...this.temp];
       
        
      })
      });
  }

  generatePDF(row,action) {

    if(row.medicine_id.toString().indexOf(',') > -1){
      this.mediid = row.medicine_id.toString().split(',');
 this.medirow = row.medicine_name.split(',');
 this.mediquantity = row.medicine_quantity.split(',');
 this.medimrp = row.medicine_mrp.split(',');
 this.meditoalamount = row.total_amount.split(',');
 
 }else{
   this.medirow = [];
   this.mediquantity = [];
   this.mediid = [];
   this.medimrp = [];
   this.meditoalamount = [];
   
   this.mediid.push(row.medicine_id);
   this.medirow.push(row.medicine_name);
   this.mediquantity.push(row.medicine_quantity);
   this.meditoalamount.push(row.total_amount);
   this.medimrp.push(row.medicine_mrp);
 
 }

for(let i=0; i<this.mediid.length;i++){
this.pfddataobj = {
  'name':this.medirow[i],
  'quantity':this.mediquantity[i],
  'mrp':this.medimrp[i],
  'total':this.meditoalamount[i]
}
this.pdfdataarray.push(this.pfddataobj);
}


    let docDefinition = {
      content: [
        {
          text: this.companyname,
          fontSize: 16,
          alignment: 'center',
          color: '#047886'
        },
        {
          text: 'INVOICE',
          fontSize: 20,
          bold: true,
          alignment: 'center',
          decoration: 'underline',
          color: 'skyblue'
        },
        {
          text: 'Customer Details',
          style: 'sectionHeader'
        },
        {
          columns: [
            [
              {
                text: row.name,
                bold:true
              },
              { text: row.address }
              
             
            ],
            [
              {
                text: this.companyname,
                alignment: 'right'
              },
              { 
                text: `Bill No : #${(row.id)}`,
                alignment: 'right'
              },
              { 
                text: `Bill Date : ${(row.date)}`,
                alignment: 'right'
              }
            ]
          ]
        },
        {
          text: 'Order Details',
          style: 'sectionHeader'
        },
        {
          table: {
            headerRows: 1,
            widths: ['*', 'auto', 'auto', 'auto'],
            body: [
              [{text:'Medicine Name', bold:true}, {text:'Quantity', bold:true}, {text:'Unit Price', bold:true}, {text:'Amount', bold:true} ],
              ...this.pdfdataarray.map(p => ([p.name, p.quantity, p.mrp, p.total])),
              [{text: 'Discount', colSpan: 3, bold:true}, {}, {}, (row.discount*row.subtotal)/100],
              [{text: 'Total Amount', colSpan: 3, bold:true}, {}, {}, {text: '₹ '+row.grand_total, bold:true}]
            ]
          }
        },
        {
          text: 'This is computerized invoice no signature is Required'
        },
      ],
      styles: {
        sectionHeader: {
          bold: true,
          decoration: 'underline',
          fontSize: 14,
          margin: [0, 15,0, 15]          
        }
      }
    };

if(action == 'download'){
      pdfMake.createPdf(docDefinition).download();      
    }
    if(action == 'open'){
      pdfMake.createPdf(docDefinition).open();      
    }


      this.pdfdataarray = [];
  }

  openModal(row){
 
   if(row.medicine_id.toString().indexOf(',') > -1){
     this.mediid = row.medicine_id.toString().split(',');
this.medirow = row.medicine_name.split(',');
this.mediquantity = row.medicine_quantity.split(',');
this.medimrp = row.medicine_mrp.split(',');
this.meditoalamount = row.total_amount.split(',');

}else{
  this.medirow = [];
  this.mediquantity = [];
  this.mediid = [];
  this.medimrp = [];
  this.meditoalamount = [];
  
  this.mediid.push(row.medicine_id);
  this.medirow.push(row.medicine_name);
  this.mediquantity.push(row.medicine_quantity);
  this.meditoalamount.push(row.total_amount);
  this.medimrp.push(row.medicine_mrp);

}
this.rowdata = row;


 this.htmlInsideModal.open();

  }


  public changeLimit(event): void {
    this.limit = parseInt(event.target.value);
   
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
  
        this._electronservice.ipcRenderer.send('delete-invoice',row.id);
     
        
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
    this.invoicedata = this.temp.filter(item => {
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

 



}
