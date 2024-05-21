import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IMSListPageComponent } from './IMSListPage.component';

describe('IMSListPageComponent', () => {
  let component: IMSListPageComponent;
  let fixture: ComponentFixture<IMSListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IMSListPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IMSListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
