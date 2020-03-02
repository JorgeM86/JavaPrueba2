import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StoreBuyPage } from './store-buy.page';

describe('StoreBuyPage', () => {
  let component: StoreBuyPage;
  let fixture: ComponentFixture<StoreBuyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreBuyPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StoreBuyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
