import { Ingredient } from 'src/app/shared/ingredient.model';
import *as ShoppingListActions from './shopping-list.actions';



export interface State{
  ingredients: Ingredient[];
  editedIngredient:Ingredient;
  editedIngredientIndex:number;
}


const initialState :State ={
    ingredients:  [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
      ],

      editedIngredient : null,
      editedIngredientIndex :-1
};

export function shoppingListReducer(
  state :State = initialState,
   action:ShoppingListActions.ShoppingListActions
   )
    {
    switch(action.type){
      case ShoppingListActions.ADD_INGREDIENT:
          return {
         ...state,
        ingredients: [...state.ingredients, action.payload]
          };
          case  ShoppingListActions.ADD_INGREDIENTS:
            return {
              ...state,
              ingredients: [...state.ingredients,...action.payload]
            };
          case ShoppingListActions.UPDATE_INGREDIENT:
          const ingredient = state.ingredients[state.editedIngredientIndex]
          const UpdateIngredient = {
            ...ingredient,
            ...action.payload
          };
          const UpdateIngredients =[...state.ingredients];
          UpdateIngredients[state.editedIngredientIndex] =  UpdateIngredient;


            return{
                  ...state,
                  ingredients:UpdateIngredients,
                  editedIngredientIndex: -1,
                  editedIngredient: null
            };
            case ShoppingListActions.DELETE_INGREDIENT:
             return {
               ...state,
               ingredients:state.ingredients.filter((ig, igIndex) => {
                 return igIndex !== state.editedIngredientIndex;
               }),
               editedIngredientIndex: -1,
               editedIngredient: null

             };
              case ShoppingListActions.START_EDIT:
              return {
                ...state,
                editedIngredientIndex: action.playload,
                editedIngredient:{ ...state.ingredients[action.playload]}
              };
              case ShoppingListActions.STOP_EDIT:
                return {
                  ...state,
                  editedIngredient: null,
                  editedIngredientIndex: -1


                };
                
          default:
            return state; 
    }

}