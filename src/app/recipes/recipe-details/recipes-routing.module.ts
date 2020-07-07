import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipesComponent } from '../recipes.component';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { RecipeStartComponent } from '../recipe-start/recipe-start.component';
import { RecipeEditComponent } from '../recipe-edit/recipe-edit.component';
import { RecipeDetailsComponent } from './recipe-details.component';
import { RecipeResolverService } from '../recipes-resolver.service';

const routes: Routes = [
    {
        path: '',
        component: RecipesComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: RecipeStartComponent },
            { path: 'new', component: RecipeEditComponent },
            { 
                path: ':id', component: RecipeDetailsComponent, 
                resolve: [RecipeResolverService] 
            },
            { 
                path: ':id/edit', component: RecipeEditComponent, 
                resolve: [RecipeResolverService] 
            }
        ]
    }
];

@NgModule({

    imports: [RouterModule.forChild(routes)],
    exports:[RouterModule]

})
export class RecipesRoutingModule {

}