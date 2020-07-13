
import * as RecipesActions from './../store/recipe.action';
import { map, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

// import { Recipe } from './../recipe.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Recipe } from '../recipe.model';

import * as fromApp from '../../store/app.reducer';
import * as ShoppingListActions from './../../shopping-list/store/shopping-list.actions';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {
 recipe:Recipe;
 id : number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store:Store <fromApp.AppState>) { }

  ngOnInit(): void {
   this.route.params.pipe(map(parames =>{
     return +parames['id'];
   }),switchMap(id =>{
     this.id = id;
     return  this.store.select('recipes');
   }),
   map(recipesState => {
    return recipesState.recipes.find((recipe,index) => {
      return index === this.id;

    });
  })
   )
   .subscribe(recipe =>{
        this.recipe =recipe;
      });

     
  }
  onAddToShoppingList(){
    // this.recipeService.addIngreditsToshoppingList(this.recipe.ingredients);
    this.store.dispatch(new ShoppingListActions.AddIngredients(this.recipe.ingredients));
  }
  onEditRecipe(){
    this.router.navigate(['edit'],{relativeTo:this.route});
    //  this.router.navigate(['../',this.id,'edit'],{relativeTo:this.route});
  }
  onDeleteRecipe(){
    // this.recipeService.deleteRecipe(this.id);
    this.store.dispatch(new RecipesActions.DeleteRecipe(this.id));
    this.router.navigate(['/recipes']);
  }
}
