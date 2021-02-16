import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddinvoiceComponent } from './components/addinvoice/addinvoice.component';
import { AddmedicineComponent } from './components/addmedicine/addmedicine.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EditMedicineComponent } from './components/edit-medicine/edit-medicine.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ManageInvoiceComponent } from './components/manage-invoice/manage-invoice.component';
import { ManageMedicineComponent } from './components/manage-medicine/manage-medicine.component';
import { RegisterComponent } from './components/register/register.component';
import { StockReviewComponent } from './components/stock-review/stock-review.component';
import { AuthGuard } from './guards/auth.guard'; 




const routes: Routes = [
  // { path: '', component: RegisterComponent},
  { path: '', component: LoginComponent, pathMatch: 'full'},
  
  { path: 'dashboard', component: DashboardComponent, canActivate : [AuthGuard], 
  children:[
    { path: 'home', component: HomeComponent},
    { path: 'addinvoice', component: AddinvoiceComponent},
    { path: 'addmedicine', component: AddmedicineComponent},
    { path: 'managemedicine', component: ManageMedicineComponent},
    { path: 'editmedicine/:id', component: EditMedicineComponent},
    { path: 'manageinvoice', component: ManageInvoiceComponent},
    { path: 'stockreview', component: StockReviewComponent}
    
 
  ]
},
{ path: 'register', component: RegisterComponent},
{ path: 'forgotpass', component: ForgotPasswordComponent},
  { path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
