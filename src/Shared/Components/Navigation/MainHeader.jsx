//This is a child component to main navigation
//This component wraps the navbars header, along with the navigation links
// props.children will display all content that is a child component to main header
import classes from "./MainHeader.module.css";

const MainHeader = (props) => {
  return <header className={classes["main-header"]}>{props.children}</header>;
};

export default MainHeader;
