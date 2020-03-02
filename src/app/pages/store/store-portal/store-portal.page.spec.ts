import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StorePortalPage } from './store-portal.page';

describe('StorePortalPage', () => {
  let component: StorePortalPage;
  let fixture: ComponentFixture<StorePortalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StorePortalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StorePortalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
