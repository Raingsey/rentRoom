import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoidDialogComponent } from './void-dialog.component';

describe('VoidDialogComponent', () => {
  let component: VoidDialogComponent;
  let fixture: ComponentFixture<VoidDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoidDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoidDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
