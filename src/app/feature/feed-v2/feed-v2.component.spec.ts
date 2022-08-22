import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedV2Component } from './feed-v2.component';

describe('FeedV2Component', () => {
  let component: FeedV2Component;
  let fixture: ComponentFixture<FeedV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedV2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
