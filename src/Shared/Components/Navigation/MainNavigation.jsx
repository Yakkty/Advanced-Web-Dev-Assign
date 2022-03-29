import MainHeader from "./MainHeader";
import classes from "./MainNavigation.module.css";
import NavLinks from "./NavLinks";

const MainNavigation = () => {
  return (
    <MainHeader>
      <h1 className={classes["main-navigation__title"]}>Covid-19 NHS Clinic</h1>
      <nav className={classes["main-navigation__header"]}>
        <NavLinks />
      </nav>
    </MainHeader>
  );
};

export default MainNavigation;
