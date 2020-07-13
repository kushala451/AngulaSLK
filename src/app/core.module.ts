import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterCeptorService } from './auth/auth-interceptor.service';

@NgModule({
    providers:[
       
    { 
      provide: HTTP_INTERCEPTORS, 
      useClass: AuthInterCeptorService, 
      multi: true
     }
    ]

})
export class CoreModule {

}