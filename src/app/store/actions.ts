import {createAction, props} from '@ngrx/store';
import {ActionTypes} from '../types/actionTypes';
import {CumulativeJobInfoRequestInterface} from '../types/cumulativeJobInfoRequest.interface';
import {CumulativeJobInfoInterface} from '../types/cumulativeJobInfo.interface';

export const getCumulativeJobInfoAction = createAction(
  ActionTypes.GET_CUMULATIVE_JOB_INFO,
  props<{request: CumulativeJobInfoRequestInterface}>()
);

export const getCumulativeJobInfoSuccessAction = createAction(
  ActionTypes.GET_CUMULATIVE_JOB_INFO_SUCCESS,
  props<{cumulativeJobInfos: CumulativeJobInfoInterface[]}>()
);

export const getCumulativeJobInfoFailureAction = createAction(
  ActionTypes.GET_CUMULATIVE_JOB_INFO_FAILURE,
  props<{errors: string}>()
);
