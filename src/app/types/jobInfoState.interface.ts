import {CumulativeJobInfoInterface} from './cumulativeJobInfo.interface';

export interface JobInfoStateInterface {
  cumulativeJobInfos: CumulativeJobInfoInterface[] | null;
  validationErrors: string | null;
}
