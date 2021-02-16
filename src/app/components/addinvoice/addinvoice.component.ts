import { Component, OnInit, NgZone , ViewChild } from '@angular/core';
import { Invoice }  from '../invoice';
import { ElectronService } from 'ngx-electron';
import {formatDate} from '@angular/common';
import { NgForm } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

declare var $;


@Component({
  selector: 'app-addinvoice',
  templateUrl: './addinvoice.component.html',
  styleUrls: ['./addinvoice.component.css']

})
export class AddinvoiceComponent implements OnInit {
  @ViewChild('invoiceform') invoiceform:NgForm;
  @ViewChild('medicine') medicine;
  @ViewChild('quantity') quantity;
  @ViewChild('customername') cname;
  @ViewChild('address') address;
  public notifiation;
  
  public myDate = new Date();
  public todaydate = formatDate(new Date(), 'MMM DD YYYY', 'en');
  public invoiceData = new Invoice(null,'','',null,'',null,null,null,null,null,null,formatDate(new Date(), 'dd/MM/yyyy', 'en'));
  public keyword = 'medicinename';
public data = [];
public mediid:number;
public dprice:number;
public mediname:string;
public inob = {};
public totalsum = 0;
public finalsenddata = {};
public allmedicinename = [];
public allmedicineids = [];
public quantityarr = [];
public totalamountarr = [];
public pricearr = [];
public discount = 0;
public gtotal = 0;
public qlimit:number;
public qleftarr = [];
public midaray = [];
public Ismedicine = false;



public alldata = [];

  constructor(private _electronService: ElectronService, private zone:NgZone, private _service: NotificationsService, private router: Router) { }

  ngOnInit(): void {
this.get_data();
    
    this.notifiation = {
      type: 'success',
      //title: 'dsd',
      content: 'Invoice Created Sucessfully!!',
      timeOut: 1500,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true,
      animate: 'fromRight'
  
    }
   
}
  

get_data(){
  this._electronService.ipcRenderer.send('tabletdata');
    this._electronService.ipcRenderer.on('tabletdata-reply',(e,result)=>{
    this.zone.run(()=>{
//      for(let r of result){
//       if(r.quantity > 0){
// this.data.push(r);
//       }
//      }

this.data = result;
this.data = this.data.filter(data => data.quantity > 0);
    })
    });
}



  



insertinvoice(form:NgForm){

  if(this.midaray.includes(this.mediid)){
Swal.fire(
          'Medicine Already Added !!',
          '',
          'warning'
        )

  }
  else{
  

  this.inob = {
    'id':this.mediid,
    'medicine':this.mediname,
'price':this.dprice,
'totalprice':this.quantity.value*this.dprice,
'quantity':this.quantity.value,
'qleft':this.qlimit-this.quantity.value

  }
  this.totalsum += this.quantity.value*this.dprice;
  this.midaray.push(this.mediid);
this.alldata.push(this.inob); 



}



}
selectChangeHandler (event: any) {
  //update the ui
  this.qlimit = event.target.options[event.target.options.selectedIndex].getAttribute('data-quantity');

  this.dprice = event.target.options[event.target.options.selectedIndex].getAttribute('data-price');
  this.mediid = event.target.options[event.target.options.selectedIndex].getAttribute('value');
  

  this.mediname = event.target.options[event.target.options.selectedIndex].text;


}

delrow(index:number,ad){
  this.alldata.splice(index,1);
  this.midaray.splice(index,1);
  this.totalsum -= ad.totalprice;

}

finalinvoicesubmit(){
  for(let fdata of this.alldata){
    this.allmedicinename.push(fdata.medicine);
    this.allmedicineids.push(fdata.id);
    this.quantityarr.push(fdata.quantity);
    this.totalamountarr.push(fdata.totalprice);
    this.pricearr.push(fdata.price);
    this.qleftarr.push(fdata.qleft);

    this._electronService.ipcRenderer.send('changequantity',{'id':fdata.id,'qunatity': fdata.qleft});
  }
  this.gtotal = this.totalsum-this.totalsum*(this.discount/100);

 

  this.finalsenddata = {
    'cname':this.cname.value,
    'caddress':this.address.value,
    'mname':this.allmedicinename.join(),
    'mid':this.allmedicineids.join(),
    'subtotal':this.totalsum,
    'totalamount':this.totalamountarr.join(),
    'quantity': this.quantityarr.join(),
    'price':this.pricearr.join(),
    'discount':this.discount,
    'grandtotal':this.gtotal.toFixed(2),
    'date':formatDate(new Date(), 'dd/MM/yyyy', 'en')
  }
  this._electronService.ipcRenderer.send('invoicesubmit',this.finalsenddata);
  this._service.create(this.cname.value, this.notifiation.content, this.notifiation.type);
  this.invoiceform.reset();

 this.get_data();
  console.log(this.finalsenddata);
  this.finalsenddata = null;
  this.allmedicinename = [];
  this.allmedicineids = [];
  this.alldata = [];
  this.totalamountarr = [];
  this.midaray = [];
  this.gtotal = 0;
  this.totalsum = 0;
  this.pricearr = [];
  this.allmedicineids = [];
  this.quantityarr = [];
  this.discount = 0;
 

  
}

selectEvent(item) {

  
  

 if(item.quantity>0){
  this.qlimit = item.quantity;
  this.dprice = item.price;
  this.mediid = item.id;
  this.mediname = item.medicinename;
}else{
  console.log('error');
}
}

onChangeSearch(search: string) {
 
}

onFocused(e) {

  this.Ismedicine = true;
}
  }

 


