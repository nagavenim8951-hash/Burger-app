import React from "react";
import classes from './Spinner.module.css'

const spinner = () =>(
   <div className={classes.loaderContainer}>
   <span className={classes.loader}></span>
</div>
)
export default spinner;