import React, {Component} from "react";
import Auxiliary from '../../hoc/Auxiliary'
import classes from './Layout.module.css'
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";
import { connect } from "react-redux";

class Layout extends Component {
    state ={
        ShowSideDrawer:true
    }
    SideDrawerClosedHandler = () =>{
        this.setState({ShowSideDrawer:false})
    }
    SideDrawerToggleHandler = () =>{
      this.setState((prevState ) => {
        return {ShowSideDrawer : !prevState.ShowSideDrawer}
        })
    }
render(){
    return (
<Auxiliary>
    <Toolbar 
          isAuth={this.props.isAuthenticated}
          drawerToggleClicked={this.SideDrawerToggleHandler} />

    <SideDrawer 
         isAuth={this.props.isAuthenticated}
         open = {this.state.ShowSideDrawer} 
         closed={this.SideDrawerClosedHandler}/>  

        <main className={classes.content}>
            {this.props.children}
        </main>
    </Auxiliary>
        )
    }
}
const mapStateToProps = state => {
    return {
        isAuthenticated : state.auth.token !== null
    }
}
export default connect(mapStateToProps)(Layout);