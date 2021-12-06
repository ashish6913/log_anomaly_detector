import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { OpenTelemetryInterceptorModule, OtelColExporterModule, CompositePropagatorModule } from '@jufab/opentelemetry-angular-interceptor';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BaseModule } from './base/base.module';
import { CoreModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { authInterceptorProviders } from './auth/auth.interceptor';
// import { AdminBoardComponent } from './admin/admin-board/admin-board.component';

@NgModule({
  declarations: [
    AppComponent,
    // AdminBoardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    //Insert module OpenTelemetryInterceptorModule with configuration, HttpClientModule is used for interceptor
    OpenTelemetryInterceptorModule.forRoot(environment.opentelemetryConfig),
    //Insert OtelCol exporter module
    OtelColExporterModule,
    //Insert propagator module
    CompositePropagatorModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    BaseModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
