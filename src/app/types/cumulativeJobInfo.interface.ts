export interface CumulativeJobInfoInterface {
  id: number;
  activeJobs: number | null;
  jobViews: number | null;
  predictedJobViews: number;
  date: Date;
}
