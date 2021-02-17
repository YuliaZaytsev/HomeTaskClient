import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CumulativeJobInfoComponent } from './cumulative-job-info.component';

describe('GoogleChartComponent', () => {
  let component: CumulativeJobInfoComponent;
  let fixture: ComponentFixture<CumulativeJobInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CumulativeJobInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CumulativeJobInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
