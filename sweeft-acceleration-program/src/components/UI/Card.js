import React from "react";
import classes from "./Card.module.css";
const Card = (props) => {
  return (
    <div className={classes.card}>
      <div className={classes.card__img}>
        <img src={props.user.imageUrl} alt="persons image" />
      </div>
      <div className={classes.card__text}>
        <h1 className={classes.card__title}>{props.user.title}</h1>
        <p className={classes.card__paragraph}>
          {props.user.name} {props.user.lastName}
        </p>
      </div>
    </div>
  );
};

export default Card;
