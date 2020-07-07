import { LoggingService } from './loggin.services';

import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';





@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,    
    
   


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
     SharedModule,
    CoreModule
 
  ],
 
  bootstrap: [AppComponent],
  // providers:[LoggingService]

})
export class AppModule { }
