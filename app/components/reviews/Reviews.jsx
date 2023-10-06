import React from "react";
import Carousel from "react-bootstrap/Carousel";

import classes from "./carouselReviews.module.css";

function Reviews({ partnershipLogos }) {
  const reviews = [
    {      
      companyLogo: partnershipLogos[0].url,
      description:
        "From our side the ask vs assets in the building turn around was fantastic!! I could not have asked for more. I will be onsite this week. Will advise if I see any issues that might need addressed. I cannot thank you enough, your team has been very responsive, and the drivers are very productive. Thanks!",
    },
    {      
      companyLogo: partnershipLogos[3].url,
      description:
        "Just wanted to let you know that Paul, Max & Igor have all been a HUGE help. I know that when I see them here whatever load I have they will get done in a timely manner as safe and quickly as possible. You should be so lucky to have them as drivers. Thank you for allowing them to help us. We appreciate you all!",
    },
    {      
      companyLogo: partnershipLogos[0].url,
      description:
        "Just wanted to let you know that Paul is doing a great job for us. He is running these routes like an all-star. We greatly appreciate the help.",
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
              <img src={review.companyLogo} alt="First slide" />              
              <p>{review.description}</p>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export default Reviews;
