import { Store } from '@ngrx/store';
import { LoggingService } from './loggin.services';
// import { AuthService } from './auth/auth.service';
import { Component, OnInit } from '@angular/core';
import * as fromApp from './store/app.reducer';
import * as AuthActions from './auth/store/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{

  constructor(
    // private authService:AuthService,
    private store :Store<fromApp.AppState>,
    private loggingService: LoggingService
    ) {}
  ngOnInit(){

    // this.authService.autoLogin();
    this.store.dispatch(new AuthActions.AutoLogin() );
    this.loggingService.printLog('Hello for AppComponent ngOnit');

  }
}
