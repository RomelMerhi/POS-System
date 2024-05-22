import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { OrdersAdmin2Component } from '../orders-admin2/orders-admin2.component';
import { OrderPannelAdminComponent } from '../order-pannel-admin/order-pannel-admin.component';
import { PayChangeAdminComponent } from '../pay-change-admin/pay-change-admin.component';
import { AdminPage } from './admin.page';
import { AddItems3Component } from '../add-items3/add-items3.component';
import { Navbar3Component } from '../navbar3/navbar3.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule
  ],exports:[Navbar3Component],
  declarations: [AdminPage, OrdersAdmin2Component, OrderPannelAdminComponent, PayChangeAdminComponent,AddItems3Component,Navbar3Component ]
})
export class AdminPageModule {}
