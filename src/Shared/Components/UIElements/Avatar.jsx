//This is a reusable avatar component for displaying images

import classes from "./Avatar.module.css";

//This avatar has default styling, along with accepting properties to allow further configuration
//Props allows for src setting inside the component its used it, rather than it being statically defined
//This allows for the component to be reusable
const Avatar = (props) => {
  return (
    <div className={`${classes.avatar} ${props.className}`}>
      <img src={props.image} alt={props.alt} />
    </div>
  );
};

export default Avatar;
