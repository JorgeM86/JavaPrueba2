import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StoreAdminPage } from './store-admin.page';

describe('StoreAdminPage', () => {
  let component: StoreAdminPage;
  let fixture: ComponentFixture<StoreAdminPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreAdminPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StoreAdminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
