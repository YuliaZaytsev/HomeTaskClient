import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {
  getCumulativeJobInfoAction, getCumulativeJobInfoFailureAction, getCumulativeJobInfoSuccessAction
} from './actions';

import {CumulativeJobInfoService} from '../services/cumulativeJobInfo.service';
import {catchError, map, switchMap} from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';
import {of} from 'rxjs';
import {CumulativeJobInfoInterface} from '../types/cumulativeJobInfo.interface';

@Injectable()
export class JobEffect {

  job$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getCumulativeJobInfoAction),
      switchMap(({request}) => {
        return this.cumulativeJobInfoService.getCumulativeJobInfoByDateRange(request).pipe(
          map((cumulativeJobInfos: CumulativeJobInfoInterface[]) => {
            return getCumulativeJobInfoSuccessAction({cumulativeJobInfos});
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              getCumulativeJobInfoFailureAction({errors: errorResponse.error?.errors})
            );
          })
        );
      })
    )
  );

  constructor(private actions$: Actions, private cumulativeJobInfoService: CumulativeJobInfoService) {
  }
}
