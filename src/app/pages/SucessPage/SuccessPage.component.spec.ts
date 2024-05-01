import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessPageComponent } from './SuccessPage.component';

describe('SucessPageComponent', () => {
  let component: SuccessPageComponent;
  let fixture: ComponentFixture<SuccessPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuccessPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuccessPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
