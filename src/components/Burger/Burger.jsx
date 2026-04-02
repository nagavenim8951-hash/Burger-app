import React from "react";
import classes from './Burger.module.css'
import BurgerIngrediant from "./BurgerIngrediant/BurgerIngrediant";

const Burger = (props) => {
   let transformIng = Object.keys(props.ingredients)
   .map(igKey => {
    
       return [...Array(props.ingredients[igKey])].map((_, i) => {//[,]
         return <BurgerIngrediant key={igKey + i} type={igKey} />;
       })
   })
   .reduce((arr,el)=>{
    return arr.concat(el)
   },[]);
   if(transformIng.length === 0){
     transformIng =<p>Please add Ingrediants</p>
   }

 return (
    <div className={classes.Burger}>
    <BurgerIngrediant type="bread-top"/>
    {transformIng}
    <BurgerIngrediant type="bread-bottom"/>
    </div>
 )
}
export default Burger;



















































// _________________________________________________________________________________________
// const transformIng = Object.keys(props.ingredients)
//    .map(igKey => {
//        return [...Array(props.ingredients[igKey])].map((_, i) => {//[,]
//          return <BurgerIngrediant key={igKey + i} type={igKey} />;
//        })
//EXPLANATION->
// Object.keys(props.ingredients)

// Assume your ingredients looks like this:

// ingredients = {
//   salad: 1,
//   cheese: 2,
//   meat: 1,
//   bacon: 2
// }


// Object.keys() converts this object into an array of keys:

// ["salad", "cheese", "meat", "bacon"]


// So now .map() runs once for each ingredient type.

// 2️⃣ First .map(igKey => { ... })

// Here:

// .map(igKey => { ... })


// igKey will be:

// "salad"

// "cheese"

// "meat"

// "bacon"

// One by one.

// 3️⃣ props.ingredients[igKey]

// This gives the quantity.

// Example:

// If igKey = "cheese"

// props.ingredients["cheese"] = 2

// So we know we must create 2 cheese components.

// 4️⃣ Array(props.ingredients[igKey])

// If quantity = 2:

// Array(2)


// This creates:

// [empty × 2]


// But this array cannot be mapped directly.

// 5️⃣ [...Array(props.ingredients[igKey])]

// The spread operator ... converts it into a usable array:

// [undefined, undefined]


// Now we can use .map() on it.

// 6️⃣ Second .map((_, i) => { ... })

// This runs based on quantity.

// For cheese (2):

// It runs 2 times:

// i = 0

// i = 1

// Each time it returns:

// <BurgerIngrediant key={igKey + i} type={igKey} />


// So for cheese:

// <BurgerIngrediant key="cheese0" type="cheese" />
// <BurgerIngrediant key="cheese1" type="cheese" />
