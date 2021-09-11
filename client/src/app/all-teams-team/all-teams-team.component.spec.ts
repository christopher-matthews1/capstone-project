import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTeamsTeamComponent } from './all-teams-team.component';

describe('TeamComponent', () => {
  let component: AllTeamsTeamComponent;
  let fixture: ComponentFixture<AllTeamsTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllTeamsTeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllTeamsTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
