import { Subject } from 'rxjs';
import { ShoppingListService } from './../shopping-list/shopping.list.service';
import { Ingredient } from './../shared/ingredient.model';
import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
@Injectable()
export class RecipeService{
    recipesChanged = new Subject<Recipe[]>();


    // recipes : Recipe[] =[
    //     new Recipe(
    //         'Tasty Schnitzel',
    //         'A super-tasty schnitzel- just awesome !',
    //         'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg',
    //         [
    //             new Ingredient('Meat',1),
    //             new Ingredient('French Fries',20)
    //       private  ]),
    //     new Recipe(' Big fat burger',
    //     'What else you nedd to Say?',
    //     'https://get.pxhere.com/photo/dish-meal-food-vegetable-recipe-cuisine-vegetarian-food-parmigiana-1417897.jpg',
    //     [  new Ingredient('buns',3), 
    //        new Ingredient('Meat',1)
    // ])
    //   ];

    private recipes: Recipe[] =[];

      constructor(private slService:ShoppingListService){     }

      setRecipes(recipes: Recipe[]){
          this.recipes =recipes;
          this.recipesChanged.next(this.recipes.slice());
      }

      getRecipes(){
          return this.recipes.slice();
      }
     getRecipe(index: number){
         return this.recipes[index];
     }

      addIngreditsToshoppingList(ingredients:Ingredient[]) {
          this.slService.addIngredients(ingredients);

      }
     addRecipe(recipe: Recipe){
         this.recipes.push(recipe);
         this.recipesChanged.next(this.recipes.slice());

     }

     updateRecipe(index: number, newRecipe: Recipe){
         this.recipes[index] = newRecipe;
         this.recipesChanged.next(this.recipes.slice())

     }
     deleteRecipe(index:number){
         this.recipes.splice(index,1);
         this.recipesChanged.next(this.recipes.slice())
     }
}