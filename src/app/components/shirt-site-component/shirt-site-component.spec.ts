import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShirtSiteComponent } from './shirt-site-component';

describe('ShirtSiteComponent', () => {
  let component: ShirtSiteComponent;
  let fixture: ComponentFixture<ShirtSiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShirtSiteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShirtSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
