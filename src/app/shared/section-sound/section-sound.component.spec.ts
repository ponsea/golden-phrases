import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionSoundComponent } from './section-sound.component';

describe('SectionSoundComponent', () => {
  let component: SectionSoundComponent;
  let fixture: ComponentFixture<SectionSoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionSoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionSoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
