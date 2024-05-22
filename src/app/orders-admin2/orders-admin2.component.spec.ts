import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OrdersAdmin2Component } from './orders-admin2.component';

describe('OrdersAdmin2Component', () => {
  let component: OrdersAdmin2Component;
  let fixture: ComponentFixture<OrdersAdmin2Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdersAdmin2Component ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OrdersAdmin2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
