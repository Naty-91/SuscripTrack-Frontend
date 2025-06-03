import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersMngComponent } from './users-mng.component';

describe('UsersMngComponent', () => {
  let component: UsersMngComponent;
  let fixture: ComponentFixture<UsersMngComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersMngComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersMngComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
