import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {CumulativeJobInfoRequestInterface} from '../types/cumulativeJobInfoRequest.interface';
import { map } from 'rxjs/operators';
import {CumulativeJobInfoInterface} from '../types/cumulativeJobInfo.interface';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CumulativeJobInfoService {

  constructor(private http: HttpClient) { }

  getCumulativeJobInfoByDateRange(data: CumulativeJobInfoRequestInterface): Observable<CumulativeJobInfoInterface[]> {

    const url = environment.apiUrl +
      `/CumulativeJobInfo?from=${data.dateRange.from.toISOString()}&to=${data.dateRange.to.toISOString()}`;

    return this.http.get(url, {})
      .pipe(map((response: CumulativeJobInfoInterface[]) => response));
  }
}

