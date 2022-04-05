//This is a reusable card component

import classes from "./Card.module.css";

//Card is a UI element
const Card = (props) => {
  return (
    //Styling the card with card specific styling, along with allowing the option to dynamically style the card in individual components
    //By being able to receive props to set styles
    //Props.children allows for content put inside the card to be shown
    <div className={`${props.className} ${classes.card}`}>{props.children}</div>
  );
};

export default Card;
