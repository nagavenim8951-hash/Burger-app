import React,{Component} from "react";
import Button from "../../../../components/UI/Button/Button";
import classes from './ContactData.module.css'
import axios from "../../../../axios-orders";
import Spinner from "../../../../components/UI/Spinner/Spinner";
import Input from "../../../../components/UI/Input/Input";
import {connect} from 'react-redux'
import withErrorHandler from "../../../../hoc/withErrorHandler/withErrorHandler";
import * as actions from '../../../../store/actions/index'
import { updateObject,checkValidity } from "../../../../shared/utility";

class ContactData extends Component{
 state={
  orderForm: {
      name:{
        elementType:'input',
        elementConfig:{
          type:'text',
          placeholder:'your Name',
        },
        value:'' ,
        validation:{
          required:true,
        },
        valid:false,
        touched:false,
      },
      street:{
        elementType:'input',
        elementConfig:{
          type:'text',
          placeholder:'Street',
        },
        value:'',
        validation:{
          required:true,
        },
        valid:false,
        touched:false,
      },
      zipCode:{
        elementType:'input',
        elementConfig:{
          type:'text',
          placeholder:'Zip code',
        },
        value:'',
        validation:{
          required:true,
          minLength:5,
          maxLength:5,
        },
        valid:false,
        touched:false,
      },
      country:{
        elementType:'input',
        elementConfig:{
          type:'text',
          placeholder:'your country',
        },
        value:'',
        validation:{
          required:true,
        },
        valid:false,
        touched:false,
      },
      email:{
        elementType:'input',
        elementConfig:{
          type:'text',
          placeholder:'your E-mail',
        },
        value:'',
        validation:{
          required:true,
        },
        valid:false,
        touched:false,
      },
      deliveryMethod:{
        elementType:'select',
        elementConfig:{
         options:[
          {value:'fastest',displayValue:'fastest'},
           {value:'Cheapest',displayValue:'Cheapest'}
        ]
         
        },
        value:'fastest',
        validation:{},
        valid:true,
      },
  },
    formIsValid:false,
    loading:false,
 }
 orderHandler = (event) =>{
    event.preventDefault()
//   console.log(this.props.ingredients)
//  alert('You can continue!')
const formdata = {};
for(let formElementIdentifier in this.state.orderForm){
  formdata[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
}
   const order = {
    ingredients:this.props.ings,
    price:this.props.price,
    customer:formdata,
    userId: this.props.userId

   }
   this.props.onOrderBurger(order,this.props.token);
   console.log("ORDER DATA:", order);
    
 }

 inputChangedHandler = (event, inputIdentifier) =>{
  // console.log(event.target.value)
  
  const updatedFormElemrnt = updateObject(this.state.orderForm[inputIdentifier],{
    value: event.target.value,
  valid:checkValidity(event.target.value,this.state.orderForm[inputIdentifier].validation),
  touched:true,
  })

  const updatedOrderForm =updateObject(this.state.orderForm,{
    [inputIdentifier] : updatedFormElemrnt,
  })
   
  updatedOrderForm[inputIdentifier] = updatedFormElemrnt
  // console.log(updatedFormElemrnt)
  let formIsValid= true;
  for(let inputIdentifier in updatedOrderForm){
    formIsValid =   updatedOrderForm[inputIdentifier].valid && formIsValid
  }
  this.setState({orderForm:updatedOrderForm,formIsValid:formIsValid})
 }

 render(){
   let formElementArray = [];
   for(let key in this.state.orderForm){
    formElementArray.push({
      id:key,
      config:this.state.orderForm[key]
    })
   }
  let form=(
             <form onSubmit={this.orderHandler}>

                {formElementArray.map(formElement => (
                  <Input 
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value} 
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={(event) => this.inputChangedHandler(event,formElement.id)}  
                  />
                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
  );
  if(this.props.loading){
    form=<Spinner />
  }
    return (
        <div className={classes.ContactData}>
            <h4>Enter your Contact Data</h4>
                {form}
        </div>
    )
 }
}
const mapStateToProps = state => {
  return{
    ings:state.burgerBuilder.ingredients,
    price:state.burgerBuilder.totalPrice,
    loading:state.order.loading,
    token:state.auth.token,
    userId: state.auth.userId,
  }
}

const mapDispatchToProps = dispatch =>{
  return{
      onOrderBurger : (orderdata,token) => dispatch(actions.purchaseBurger(orderdata,token))
  }

}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios));