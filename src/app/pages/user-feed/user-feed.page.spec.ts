import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFeedPage } from './user-feed.page';

describe('UserFeedPage', () => {
  let component: UserFeedPage;
  let fixture: ComponentFixture<UserFeedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserFeedPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFeedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
