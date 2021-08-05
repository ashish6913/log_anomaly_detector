import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingEditDialogComponent } from './rating-edit-dialog.component';

describe('RatingEditDialogComponent', () => {
  let component: RatingEditDialogComponent;
  let fixture: ComponentFixture<RatingEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RatingEditDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
