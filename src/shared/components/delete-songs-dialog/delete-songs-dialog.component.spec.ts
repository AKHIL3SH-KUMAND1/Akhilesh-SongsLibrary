import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSongsDialogComponent } from './delete-songs-dialog.component';

describe('DeleteSongsDialogComponent', () => {
  let component: DeleteSongsDialogComponent;
  let fixture: ComponentFixture<DeleteSongsDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteSongsDialogComponent]
    });
    fixture = TestBed.createComponent(DeleteSongsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
