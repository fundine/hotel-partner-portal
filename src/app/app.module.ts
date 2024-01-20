import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from './login/login.module';
import { CoreModule } from './core/core.module';
import { ExternalLinkModule } from './external-link/external-link.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    CoreModule,
    ExternalLinkModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
