import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourcetestComponent } from './resourcetest.component';

describe('ResourcetestComponent', () => {
  let component: ResourcetestComponent;
  let fixture: ComponentFixture<ResourcetestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourcetestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourcetestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
