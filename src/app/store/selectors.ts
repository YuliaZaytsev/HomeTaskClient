import {AppStateInterface} from 'src/app/types/appState.interface';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import {JobInfoStateInterface} from '../types/jobInfoState.interface';

export const jobInfoFeatureSelector = createFeatureSelector<
  AppStateInterface,
  JobInfoStateInterface
  >('jobInfo')

export const cumulativeJobInfosSelector = createSelector(
  jobInfoFeatureSelector,
  (jobViewsState: JobInfoStateInterface) => jobViewsState.cumulativeJobInfos
)
