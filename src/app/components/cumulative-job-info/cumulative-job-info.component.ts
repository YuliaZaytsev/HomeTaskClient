import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {getCumulativeJobInfoAction} from '../../store/actions';
import {CumulativeJobInfoRequestInterface} from '../../types/cumulativeJobInfoRequest.interface';
import {AppStateInterface} from '../../types/appState.interface';
import {CumulativeJobInfoInterface} from '../../types/cumulativeJobInfo.interface';
import {cumulativeJobInfosSelector} from '../../store/selectors';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-cumulative-job-info',
  templateUrl: './cumulative-job-info.component.html',
  styleUrls: ['./cumulative-job-info.component.scss']
})
export class CumulativeJobInfoComponent implements OnInit, OnDestroy {
  form: FormGroup;
  oneDay = (1000 * 60 * 60 * 24);
  hAxisTicks = [];

  columns = ['Date', {type: 'string', role: 'annotation'}, 'Active Jobs', 'Job Views', 'Predicted Views'];
  options = {
    titleTextStyle: {color: '13587D'},
    series: {
      0: {type: 'bars'},
      1: {targetAxisIndex: 0, pointShape: {type: 'circle'}},
      2: {targetAxisIndex: 1, pointShape: {type: 'circle'}, lineDashStyle: [2, 2]},
    },
    hAxis: {
      format: 'MMM dd',
      slantedText: true,
      slantedTextAngle: 45,
      ticks: this.hAxisTicks,
      gridlines : {
        color: 'transparent'
      }
    },
    vAxes: {
      0: {
        title: 'Job Views',
        gridlines : {
          count : 4
        },
      },
      1: {
        title: 'Jobs',
        gridlines : {
          count: 0
        }
      },
      ticks : [0, 50, 100, 150, 200]
    },
      seriesType: 'line',
      pointSize: 8,
      legend: 'bottom',
      colors: ['#DDDDDD', '#96C03B', '#39AFC8'],
      is3D: true,
    tooltip: {isHtml: true},
    focusTarget: 'category',
    annotations: {
      style: 'line'
    },
    interpolateNulls: false
  };
  data;
  jobsInfoSubscription: Subscription;


  constructor(private store: Store<AppStateInterface>, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
    this.initializeValues();
    this.drawChart();
  }

  initializeForm(): void {
    this.form = this.fb.group({
      from: [new Date(2021, 0, 20), Validators.required],
      to: [new Date(), Validators.required],
    });
  }

  initializeValues(): void {
    this.jobsInfoSubscription = this.store.select<CumulativeJobInfoInterface[]>(cumulativeJobInfosSelector).subscribe(
      (infos: CumulativeJobInfoInterface[]) =>
      {
        this.data = infos.map(info =>
        {
          // put annotations for start and end
          const ann = (infos.indexOf(info) == 0) || (infos.indexOf(info) == infos.length - 1)  ? '' : null;

          return [new Date(info.date), ann , info.activeJobs, info.jobViews, info.predictedJobViews];
        });

        this.CreateTicks(infos);
      });
  }

  onSubmit(): void {
    this.drawChart();
  }

  drawChart(): void {
    const request: CumulativeJobInfoRequestInterface = {
      dateRange:  this.form.value
    };

    this.store.dispatch(getCumulativeJobInfoAction({request}));
  }

  CreateTicks(infos: CumulativeJobInfoInterface[]): void {
    this.hAxisTicks.length = 0;

    if (infos.length > 0){
      const minDate = new Date(infos[0].date).getTime();
      const maxDate = new Date(infos[infos.length - 1].date).getTime();
      for (let i = minDate; i <= maxDate; i = i + this.oneDay) {
        this.hAxisTicks.push(new Date(i));
      }
    }
  }

  ngOnDestroy(): void {
    this.jobsInfoSubscription.unsubscribe();
  }
}
