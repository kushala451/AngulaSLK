import {NgForm} from'@angular/forms';
import { Subscription } from 'rxjs';

import { Ingredient } from '../../shared/ingredient.model';

import { ShoppingListService } from './../shopping.list.service';
import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild
 
} from '@angular/core';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f',{static:false}) slfrom: NgForm;
   subscription : Subscription;
   editMode = false;
   editItemIndex: number;
   editedItem: Ingredient;


  constructor(private slservice: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.slservice.startedEditing
    .subscribe(
      (index: number) => {
        this.editItemIndex= index;
        this.editMode = true;
        this.editedItem =this.slservice.getIngredient(index);
        this.slfrom.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })

      }
    );
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name,value.amount);
    if(this.editMode){
      this.slservice.updateIngredient(this.editItemIndex,newIngredient);
    } else{
      this.slservice.addIngredient(newIngredient);
    }
      this.editMode = false;
      form.reset();
   
  }
  onClear() {
    this.slfrom.reset()
    this.editMode =false;
  }
  onDelete(){
    this.slservice.deleteIngredient(this.editItemIndex);
    this.onClear();

  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
