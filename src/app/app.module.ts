import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from './guards/auth.guard'; 
import { NgxElectronModule } from 'ngx-electron';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MedicineserviceService } from './services/medicineservice.service';
import { HttpClientModule } from '@angular/common/http';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ModalModule } from 'angular-custom-modal';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';




import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdminsidebarComponent } from './components/adminsidebar/adminsidebar.component';
import { AddmedicineComponent } from './components/addmedicine/addmedicine.component';
import { AddinvoiceComponent } from './components/addinvoice/addinvoice.component';
import { HeaderComponent } from './components/header/header.component';
import { ManageMedicineComponent } from './components/manage-medicine/manage-medicine.component';
import { DataTablesModule } from 'angular-datatables';
import { EditMedicineComponent } from './components/edit-medicine/edit-medicine.component';
import { ManageInvoiceComponent } from './components/manage-invoice/manage-invoice.component';
import { StockReviewComponent } from './components/stock-review/stock-review.component';
import { CsvModule } from '@ctrl/ngx-csv';
import { RegisterComponent } from './components/register/register.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    DashboardComponent,
    AdminsidebarComponent,
    AddmedicineComponent,
    AddinvoiceComponent,
    HeaderComponent,
    ManageMedicineComponent,
    EditMedicineComponent,
    ManageInvoiceComponent,
    StockReviewComponent,
    RegisterComponent,
    ForgotPasswordComponent
    
 
  
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxElectronModule,
    SimpleNotificationsModule.forRoot(),
    BrowserAnimationsModule,
    HttpClientModule,
    DataTablesModule,
    NgxDatatableModule,
    ModalModule,
    AutocompleteLibModule,
    CsvModule

  
    
    
  
  ],
  providers: [AuthGuard,
    MedicineserviceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
