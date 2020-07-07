import { LoggingService } from './../loggin.services';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping.list.service';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit ,OnDestroy{
  ingredients: Ingredient[];
  private igChangeSub: Subscription;

  constructor(private slService:ShoppingListService,private loggingService:LoggingService ) { }

  ngOnInit() {
   this.ingredients= this.slService.getIngredients();
   this.igChangeSub =  this.slService.ingredientsChanged
.subscribe(
  (ingredients: Ingredient[])=>{
  this.ingredients = ingredients;
}
);
this.loggingService.printLog('Hello from ShoppingListComponent ngonInit');
}
onEditItem(index: number){
this.slService.startedEditing.next(index);

}
ngOnDestroy(): void{
  this.igChangeSub.unsubscribe();
}
}
