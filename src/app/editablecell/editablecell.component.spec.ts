import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditablecellComponent } from './editablecell.component';

describe('EditablecellComponent', () => {
  let component: EditablecellComponent;
  let fixture: ComponentFixture<EditablecellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditablecellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditablecellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
