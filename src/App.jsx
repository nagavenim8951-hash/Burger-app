import  React, { Component } from 'react';
import Layout from './components/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/BurgerBuilder/checkout/Checkout';
import { Route, Switch,withRouter,Redirect} from 'react-router-dom';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/logout/logout';
import { connect } from 'react-redux';
import * as actions from './store/actions/index'



class App extends Component {
  componentDidMount(){
    this.props.onTryAutoSignup()
  }
  
 render(){
  let routes = (
    <Switch>
      <Route path ='/auth' component={Auth} />
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to ='/' />
    </Switch>
  )
  if(this.props.isAuthenticated){
    routes = (
      <Switch>
        <Route path="/checkout" component={Checkout} />
        <Route path ='/auth' component={Auth} />
        <Route path='/orders' component={Orders} />
        <Route path ='/logout' component={Logout} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to ='/' />
      </Switch>
    )
  }
  return (
    <div>
       <Layout>
        {/* {this.state.show ? <BurgerBuilder /> :null} */}
       {/* <BurgerBuilder />
       <Checkout /> */}
     
     {routes}
     
  
     
       </Layout>
    </div>
  )
 }
}
const mapStateToProps = state => {
  return {
    isAuthenticated:state.auth.token !== null,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup:()=>dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));




// import React, { Component } from 'react';
// import { Route, Switch, Redirect } from 'react-router-dom';
// import { connect } from 'react-redux';

// import Layout from './components/Layout/Layout';
// import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
// import Checkout from './containers/BurgerBuilder/checkout/Checkout';
// import Orders from './containers/Orders/Orders';
// import Auth from './containers/Auth/Auth';
// import Logout from './containers/Auth/logout/logout';

// class App extends Component {

//   render() {
//     const isAuth = this.props.token !== null;

//     let routes = (
//       <Switch>
//         <Route path="/auth" component={Auth} />
//         <Redirect to="/auth" />
//       </Switch>
//     );

//     if (isAuth) {
//       routes = (
//         <Switch>
//           <Route path="/checkout" component={Checkout} />
//           <Route path="/orders" component={Orders} />
//           <Route path="/logout" component={Logout} />
//           <Route path="/" exact component={BurgerBuilder} />
//           <Redirect to="/" />
//         </Switch>
//       );
//     }

//     return (
//       <div>
//         <Layout>
//           {routes}
//         </Layout>
//       </div>
//     );
//   }
// }

// const mapStateToProps = state => {
//   return {
//     token: state.auth.token
//   };
// };

// export default connect(mapStateToProps)(App);