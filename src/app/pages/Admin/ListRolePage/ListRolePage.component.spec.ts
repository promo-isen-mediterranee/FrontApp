import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRolePageComponent } from './ListRolePage.component';

describe('AddRoleFormComponent', () => {
  let component: ListRolePageComponent;
  let fixture: ComponentFixture<ListRolePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListRolePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListRolePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
