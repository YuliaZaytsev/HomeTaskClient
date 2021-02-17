import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ActionReducerMap, StoreModule} from '@ngrx/store';
import { GoogleChartsModule } from 'angular-google-charts';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CumulativeJobInfoComponent } from './components/cumulative-job-info/cumulative-job-info.component';
import {CumulativeJobInfoService} from './services/cumulativeJobInfo.service';
import {reducer} from './store/reducers';
import {EffectsModule} from '@ngrx/effects';
import {JobEffect} from './store/effects';
import {HttpClientModule} from '@angular/common/http';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';

export const reducers: ActionReducerMap<any> = {
  jobInfo: reducer,
};

@NgModule({
  declarations: [
    AppComponent,
    CumulativeJobInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([JobEffect]),
    ReactiveFormsModule,
    NoopAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatButtonModule,
    GoogleChartsModule
  ],
  providers: [CumulativeJobInfoService, FormBuilder],
  bootstrap: [AppComponent]
})
export class AppModule { }

