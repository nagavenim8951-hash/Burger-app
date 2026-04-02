
import React, { Component } from 'react'
import { connect } from 'react-redux';

import Auxiliary from '../../hoc/Auxiliary'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as BurgerBuilderActions from '../../store/actions/index'


class BurgerBuilder extends Component{
  state = {
    purchasing:false,
    
  }
  componentDidMount () {
    
    this.props.onInitIngredients();

  }

  updatePurchaseState (ingredients) {
     const sum = Object.keys(ingredients)
       .map(igKey => {
        return ingredients[igKey]
       })
       .reduce((sum,el) => {
             return sum + el;
       },0);
     return sum > 0; 
      }

  
  purchaseHandler = () =>{
    if(this.props.isAuthenticated){
       this.setState({purchasing:true})
    }else{
      this.props.onSetAuthRedirectPath('/checkout')
      this.props.history.push('/auth')
    }
    

  }
  purchaseCancleHandler = () =>{
    this.setState({purchasing:false})
  }
  purchaseContinueHandler = () =>{
  this.props.history.push('/checkout')
  }
  render(){
    const disabledInfo = {
      ...this.props.ings
    };
    for(let key in disabledInfo){
      disabledInfo[key] = disabledInfo[key] <=0;
    }

    let orderSummary = null;
    let burger = this.props.error ? <p>Ingredients can't be laoaded!</p> : <Spinner />
    if(this.props.ings){
      burger = (
      <Auxiliary>
        <Burger ingredients = {this.props.ings}/>
          <BuildControls 
                 ingredientAdded ={this.props.onIngredientAdded}
                 ingredientRemoved ={this.props.onIngredientRemoved}
                 disabled ={disabledInfo}
                 purchasable ={this.updatePurchaseState(this.props.ings)}
                 ordered={this.purchaseHandler}
                 isAuth ={this.props.isAuthenticated}
                 price={this.props.price}
               />
       </Auxiliary>                  
        );
        orderSummary = <OrderSummary 
                   ingredients={this.props.ings}
                   price={this.props.price}
                   purchaseCanceled ={this.purchaseCancleHandler}
                   purchaseContinued={this.purchaseContinueHandler} />
    }

  
    return(
            <Auxiliary>
              <Modal show={this.state.purchasing} modalClosed={this.purchaseCancleHandler}>
               {orderSummary}
              </Modal>            
              {burger}
            </Auxiliary>
    )
  }
}

const mapStateToProps =  state => {
  return {
    ings:state.burgerBuilder.ingredients,
    price:state.burgerBuilder.totalPrice,
    error:state.burgerBuilder.error,
    isAuthenticated :state.auth.token !== null,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) => dispatch(BurgerBuilderActions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) => dispatch(BurgerBuilderActions.removeIngredient(ingName)),
    onInitIngredients:() => dispatch(BurgerBuilderActions.initIngredients()),
    onInitPurchase:() =>  dispatch(BurgerBuilderActions.purchaseInit()),
    onSetAuthRedirectPath : (path) => dispatch(BurgerBuilderActions.setAuthRedirectPath(path))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));