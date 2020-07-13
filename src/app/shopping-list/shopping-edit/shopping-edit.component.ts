import { Store } from '@ngrx/store';
import {NgForm} from'@angular/forms';
import { Subscription } from 'rxjs';
import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild
 
} from '@angular/core';

import { Ingredient } from '../../shared/ingredient.model';



import * as ShoppingListActions  from '../store/shopping-list.actions'; 
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f',{static:false}) slfrom: NgForm;
   subscription : Subscription;
   editMode = false;
     editedItem: Ingredient;


  constructor(
  
    private store:Store<fromApp.AppState>
    ) { }

  ngOnInit() {
    this.subscription = this.store
    .select('shoppingList').subscribe(stateData => {
      if(stateData.editedIngredientIndex > -1){
       this.editMode =true;
       this.editedItem =stateData.editedIngredient;
       
       this.slfrom.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount
      })
 
      }else{
        this.editMode = false;
      }
    });
    
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name,value.amount);
    if(this.editMode){
      // this.slservice.updateIngredient(this.editItemIndex,newIngredient);
      this.store.dispatch(
        new ShoppingListActions.UpdateIngredient(newIngredient)
        );
    } else{
      // this.slservice.addIngredient(newIngredient);
      this.store.dispatch( new ShoppingListActions.AddIngredient(newIngredient));
    }
      this.editMode = false;
      form.reset();
   
  }
  onClear() {
    this.slfrom.reset()
    this.editMode =false;
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }
  onDelete(){
    // this.slservice.deleteIngredient(this.editItemIndex);
    this.store.dispatch(
      new ShoppingListActions.DeleteIngredient()
      );
    this.onClear();

  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

}
