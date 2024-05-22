import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OrderPannelAdminComponent } from './order-pannel-admin.component';

describe('OrderPannelAdminComponent', () => {
  let component: OrderPannelAdminComponent;
  let fixture: ComponentFixture<OrderPannelAdminComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderPannelAdminComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OrderPannelAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
