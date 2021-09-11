import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamDetailsShortComponent } from './team-details-short.component';

describe('TeamDetailsShortComponent', () => {
  let component: TeamDetailsShortComponent;
  let fixture: ComponentFixture<TeamDetailsShortComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamDetailsShortComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamDetailsShortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
