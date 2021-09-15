import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDeleteTeamComponent } from './edit-delete-team.component';

describe('EditDeleteTeamComponent', () => {
  let component: EditDeleteTeamComponent;
  let fixture: ComponentFixture<EditDeleteTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDeleteTeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDeleteTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
