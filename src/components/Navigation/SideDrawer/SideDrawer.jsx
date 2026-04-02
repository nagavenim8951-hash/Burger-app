import React from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from './SideDrawer.module.css'
import BackDrop from '../../UI/BackDrop/BackDrop';
import Auxiliary from '../../../hoc/Auxiliary'

const SideDrawer = (props) =>{
  let attachedClasses = [classes.sideDrawer,classes.Close]
  if(props.open){
    attachedClasses =[classes.sideDrawer,classes.Open]

  }
  return (
    <Auxiliary>
     <BackDrop show={props.open} clicked={props.closed}/>
       <div className={attachedClasses.join(' ')} onClick={props.closed}>
         <div className={classes.Logo}>
           <Logo />
         </div>  
        <nav>
            <NavigationItems isAuthenticated={props.isAuth}/>
        </nav>
    </div>
  
    </Auxiliary>
  )
} 

export default SideDrawer;