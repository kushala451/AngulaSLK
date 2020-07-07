import { NgModule } from '@angular/core';
import { ShoppingListService } from './shopping-list/shopping.list.service';
import { RecipeService } from './recipes/recipe.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterCeptorService } from './auth/auth-interceptor.service';

@NgModule({
    providers:[
        ShoppingListService,
        RecipeService,
    { 
      provide: HTTP_INTERCEPTORS, 
      useClass: AuthInterCeptorService, 
      multi: true
     }
    ]

})
export class CoreModule {

}