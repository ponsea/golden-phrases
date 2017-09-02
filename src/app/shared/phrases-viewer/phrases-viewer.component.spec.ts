import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhrasesViewerComponent } from './phrases-viewer.component';

describe('PhrasesViewerComponent', () => {
  let component: PhrasesViewerComponent;
  let fixture: ComponentFixture<PhrasesViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhrasesViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhrasesViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
