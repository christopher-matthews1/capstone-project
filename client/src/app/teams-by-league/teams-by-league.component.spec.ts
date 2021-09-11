import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamsByLeagueComponent } from './teams-by-league.component';

describe('TeamsByLeagueComponent', () => {
  let component: TeamsByLeagueComponent;
  let fixture: ComponentFixture<TeamsByLeagueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamsByLeagueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamsByLeagueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
