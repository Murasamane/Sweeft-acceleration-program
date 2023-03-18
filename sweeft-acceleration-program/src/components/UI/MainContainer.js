import React from "react";
import classes from './MainContainer.module.css'
const MainContainer = props =>{
    return <div className={classes.main__container}>{props.children}</div>
}

export default MainContainer;