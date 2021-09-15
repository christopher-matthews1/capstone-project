import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDeletePlayerComponent } from './edit-delete-player.component';

describe('EditDeleteComponent', () => {
  let component: EditDeletePlayerComponent;
  let fixture: ComponentFixture<EditDeletePlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDeletePlayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDeletePlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
