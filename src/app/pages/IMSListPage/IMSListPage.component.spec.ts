import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IMSListPageComponent } from './IMSListPage.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';

describe('IMSListPageComponent', () => {
  let component: IMSListPageComponent;
  let fixture: ComponentFixture<IMSListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IMSListPageComponent],
      providers: [provideAnimations(), provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(IMSListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
