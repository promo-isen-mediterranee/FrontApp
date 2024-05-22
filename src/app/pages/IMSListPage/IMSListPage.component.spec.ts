import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IMSListPageComponent } from './IMSListPage.component';
import { provideAnimations } from "@angular/platform-browser/animations";

describe('IMSListPageComponent', () => {
  let component: IMSListPageComponent;
  let fixture: ComponentFixture<IMSListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IMSListPageComponent],
      providers: [provideAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(IMSListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
