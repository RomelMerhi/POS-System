import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { CashierOrdersComponent } from '../cashier-orders/cashier-orders.component';
import { OrderPannelComponent } from '../order-pannel/order-pannel.component';
import { Tab2PageRoutingModule } from './tab2-routing.module';
import { PayChangeComponent } from '../pay-change/pay-change.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { OrdersAdminComponent } from '../orders-admin/orders-admin.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab2PageRoutingModule
  ],
  declarations: [Tab2Page,
    CashierOrdersComponent, OrderPannelComponent, PayChangeComponent, OrdersAdminComponent, 
    NavbarComponent,
    //  AddItemsComponent
  ],
  exports:[
NavbarComponent
  ]
})
export class Tab2PageModule {}
