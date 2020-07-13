import * as AuthActions from '../auth/store/auth.actions'
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import * as fromApp from '../store/app.reducer';
import { map } from 'rxjs/operators';
import * as RecipeActions from '../recipes/store/recipe.action';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
 
  isAuthenticated = false;
  private userSub : Subscription;
 
  constructor(
  
    private store:Store<fromApp.AppState>
    ){  }
    ngOnInit(){
      this.userSub = this.store.select('auth').pipe(map(authState => 
        authState.user)).subscribe( user => {
       this.isAuthenticated = !!user;
       //!user ? false: true;
       console.log(!user);
       console.log(!!user);
      });
    }
  onSaveData(){
    // this.dataStorageService.storeRecipe();
    this.store.dispatch(new RecipeActions.StoreRecipes());

  }
  onFetchData(){
    // this.dataStorageService.fetchRecipes().subscribe();
    this.store.dispatch(new RecipeActions.FetchRecipes());
  }
  onLogout(){
    // this.authService.logout();
    this.store.dispatch(new AuthActions.Logout());
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
 
}
