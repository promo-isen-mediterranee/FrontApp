import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListPageComponent } from './UserListPage.component';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from "@angular/platform-browser/animations";

describe('UserListPageComponent', () => {
  let component: UserListPageComponent;
  let fixture: ComponentFixture<UserListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserListPageComponent],
      providers: [provideHttpClient(), provideAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(UserListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
