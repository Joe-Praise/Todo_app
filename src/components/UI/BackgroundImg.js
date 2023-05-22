import React, { Fragment } from "react";
import moon from "../../images/icon-moon.svg";
import sun from "../../images/icon-sun.svg";
import lightDesktop from "../../images/bg-desktop-light.jpg"
import lightMobile from "../../images/bg-mobile-light.jpg";
import darkDesktop from "../../images/bg-desktop-dark.jpg";
import darkMobile from "../../images/bg-mobile-dark.jpg";

const BackgroundImg = (props) => {
  const isDarkMood = props.onDark;

  return (
    <Fragment>
      <div className="bg-img">
        {isDarkMood && 
        <picture>
            <source media="(min-width: 700px)" srcSet={darkDesktop} />
            <img src={darkMobile} alt="" />
        </picture>
        }
        {!isDarkMood &&
        <picture>
            <source media="(min-width:700px )" srcSet={lightDesktop} />
            <img src={lightMobile} alt="" />
        </picture>
        }
        <div className="bgContent">   
          <h1>TODO</h1>
          <div className="bgIcon" onClick={props.onToggle}>
            <figure
              className={isDarkMood ? "show" : "hidden"}
            >
              <img src={sun} alt="" />
            </figure>

            <figure className={!isDarkMood ? "show" : "hidden"}>
              <img src={moon} alt="" />
            </figure>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default BackgroundImg;
