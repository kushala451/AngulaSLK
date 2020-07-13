import { Store } from '@ngrx/store';
import { Component, ComponentFactoryResolver, ViewChild, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {  Subscription } from 'rxjs';
import { AlertComponent } from './../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
 import * as fromApp from '../Store/app.reducer';
 import * as AuthActions from './store/auth.actions';



@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: []
})
export class AuthComponent implements OnInit,OnDestroy {
    isLoginMode = true;
    isLoading = false;
    error: string = null;
    @ViewChild(PlaceholderDirective,{static:false}) alertHost: PlaceholderDirective;
    private  closeSub: Subscription;
    private storeSub:  Subscription;

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private store :Store<fromApp.AppState>
        ) {

    }
    ngOnInit() {

        this.storeSub = this.store.select('auth').subscribe(authState =>{
            this.isLoading =authState.loading;
            this.error =  authState.authError;
            if(this.error){
                this.showErrorAlert(this.error);
            }
          

        }); 
    }
    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }
    onSubmit(form: NgForm) {
        if (!form.valid) {
            return;
        }
        const email = form.value.email;
        const password = form.value.password;

        // let authObs: Observable<AuthRespopnceData>;

        // this.isLoading = true;

        if (this.isLoginMode) {
            // authObs = this.authservice.login(email, password);
            this.store.dispatch(new  AuthActions.LoginStart({
                email:email,
                password:password
            })
            );
        } else {
            // authObs = this.authservice.signup(email, password);
            this.store.dispatch(
                new AuthActions.SignupStart({email: email,password:password})
                );

        }

        form.reset();

    }
    onHandleError(){
        // this.error = null;
        this.store.dispatch(new AuthActions.clearError());
    }
   ngOnDestroy(){
       if(this.closeSub){
           this.closeSub.unsubscribe();
       }
       if(this.storeSub) {
           this.storeSub.unsubscribe();
       }
   }

    private showErrorAlert( message: string){
        // const alertCmp = new AlertComponent();
      const alertCmpFactory =  this.componentFactoryResolver.resolveComponentFactory(
          AlertComponent
          );
          const hostViewContainerRef = this.alertHost.viewContainerRef;
          hostViewContainerRef.clear();

        const ComponentRef =  hostViewContainerRef.createComponent(alertCmpFactory);

       ComponentRef.instance.message = message;
      this.closeSub = ComponentRef.instance.close.subscribe(()=>{
                this.closeSub.unsubscribe();
                hostViewContainerRef.clear();
       });

    }

} 