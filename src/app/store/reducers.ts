import {Action, createReducer, on} from '@ngrx/store';
import {getCumulativeJobInfoAction, getCumulativeJobInfoSuccessAction, getCumulativeJobInfoFailureAction} from './actions';
import {ActionTypes} from '../types/actionTypes';
import {CumulativeJobInfoInterface} from '../types/cumulativeJobInfo.interface';

export interface State {
  cumulativeJobInfos: CumulativeJobInfoInterface[];
  action: string;
  error?: string;
}

const initialState: State = {
  cumulativeJobInfos: [],
  action: '',
  error: null
};

const jobsReducer = createReducer(
  initialState,
  on(getCumulativeJobInfoAction,
    (state): State => ({
      ...state,
      action: ActionTypes.GET_CUMULATIVE_JOB_INFO,
    })
  ),
  on(getCumulativeJobInfoSuccessAction,
    (state, action): State => ({
      ...state,
      action: ActionTypes.GET_CUMULATIVE_JOB_INFO_SUCCESS,
      cumulativeJobInfos: action.cumulativeJobInfos,
      error: null
    })
  ),
  on(getCumulativeJobInfoFailureAction,
    (state, action): State => ({
      ...state,
      action: ActionTypes.GET_CUMULATIVE_JOB_INFO_FAILURE,
      error: action.errors
    })
  )
);

export function reducer(state: State, action: Action) {
  return jobsReducer(state, action);
}
