import React from "react";
import Carousel from "react-bootstrap/Carousel";

// import image4 from "../public_images/XPO_Logistics_logo.svg.png";
// import image5 from "../public_images/Saia_logo.svg.png";
// import neil from "../public_images/scott_neil.jpg";
// import emmptyWomen from "../public_images/empy_women.jpg";

import classes from "./carouselReviews.module.css";

function Reviews() {
  const reviews = [
    {
      // src: neil,
      name: "Scott Neil",
      company: "XPO",
      // companySrc: image4,
      description:
        "From our side the ask vs assets in the building turn around was fantastic!! I could not have asked for more. I will be onsite this week. Will advise if I see any issues that might need addressed. I cannot thank you enough, your team has been very responsive, and the drivers are very productive. Thanks!",
    },
    {
      // src: emmptyWomen,
      name: "Monica Mouton",
      company: "SAIA",
      // companySrc: image5,
      description:
        "Just wanted to let you know that Paul, Max & Igor have all been a HUGE help. I know that when I see them here whatever load I have they will get done in a timely manner as safe and quickly as possible. You should be so lucky to have them as drivers. Thank you for allowing them to help us. We appreciate you all!",
    },
  ];

  return (
    <div className={classes.wrapper}>
      <Carousel
        data-bs-theme="light"
        variant="light"
        className={classes.carousel}
      >
        {reviews.map((review, i) => (
          <Carousel.Item className={classes.carouselItem} key={`carousel-${i}`}>
            <div className={classes.item}>
              {/* <img src={review.src} alt="First slide" /> */}
              <h5>
                {`${review.name} - `}
                <span>
                  <img src={review.companySrc} alt="" />
                </span>
              </h5>
              <p>{review.description}</p>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export default Reviews;
