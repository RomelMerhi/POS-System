import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { OrdersAdminComponent } from './orders-admin/orders-admin.component';
import { AdminPage } from './admin/admin.page';

const routes: Routes = [
  {
    path: 'cashier',
    loadChildren: () => import('./tab2/tab2.module').then(m => m.Tab2PageModule)
  },
  {
    path: 'waiter',
    loadChildren: () => import('./tab1/tab1.module').then(m => m.Tab1PageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./tab3/tab3.module').then(m => m.Tab3PageModule)
  },
  {
    path: '',
    loadChildren: () => import('./tab3/tab3.module').then(m => m.Tab3PageModule)
  },
  {
    path: 'admin',
    component:AdminPage
  },
  {
    path: 'receipt',
    loadChildren: () => import('./receipt/receipt.module').then( m => m.ReceiptPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
