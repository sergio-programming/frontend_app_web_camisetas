import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSite } from './home-site';

describe('HomeSite', () => {
  let component: HomeSite;
  let fixture: ComponentFixture<HomeSite>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeSite]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeSite);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
