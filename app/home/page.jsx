"use client";
import React, { useEffect, useState } from "react";
import $ from "jquery";
import Link from 'next/link'

import { animateScroll as scroll } from "react-scroll";
import { AnimationOnScroll } from "react-animation-on-scroll";
import { useTranslation } from "react-i18next";

import Reviews from "../components/reviews/Reviews";
import Loader from "../components/loader/Loader";
import Contact from "../components/contact/Contact";
import Footer from "../components/footer/Footer";

import FastMarquee from "react-fast-marquee";

import classes from "./home.module.css";
import "animate.css/animate.min.css";

// header
// import hSmall from "./images/header/400.png";
// import hMedium from "./images/header/800.png";
// import hLarge from "./images/header/1200.png";
// import hBeyond from "./images/header/1950.png";

// warehouse
// import wSmall from "./images/warehouse-derivatives/400.jpg";
// import wMedium from "./images/warehouse-derivatives/800.jpg";
// import wLarge from "./images/warehouse-derivatives/1200.jpg";
// import wBeyond from "./images/warehouse-derivatives/1950.jpg";

// mountain
// import mSmall from "./images/mountain-derivatives/400.jpg";
// import mMedium from "./images/mountain-derivatives/800.jpg";
// import mLarge from "./images/mountain-derivatives/1200.jpg";
// import mBeyond from "./images/mountain-derivatives/1950.jpg";

// on wheel
// import oSmall from "./images/wheel-derivatives/400.jpg";
// import oMedium from "./images/wheel-derivatives/800.jpg";
// import oLarge from "./images/wheel-derivatives/1200.jpg";
// import oBeyond from "./images/wheel-derivatives/1950.jpg";

// partnerships
// import image1 from "./images/partnerships/Saia_logo.svg.png";
// import image2 from "./images/partnerships/XPO_Logistics_logo.svg.png";
// import image3 from "./images/partnerships/ABF_Freight_System_logo.svg.png";
// import image4 from "./images/partnerships/GP.webp";
// import image5 from "./images/partnerships/kisspng-smartway-transport-partnership-logistics-freight-t-5b0e6099d78825.0113094315276688898828.png";
// import image6 from "./images/partnerships/20171101-loup-logo-vertical.png";
// import image7 from "./images/partnerships/ptl-logo-emblem-outlined-rgb.svg";
// import image8 from "./images/partnerships/UIIALogo.png";
// import image9 from "./images/partnerships/union-pacific-logo-png-transparent.png";

// import { Query } from "react-apollo";
// import HOME_QUERY from "../CMS/main.js";

export default function Main({ navigation }) {
  const { t } = useTranslation();

  const words = ["Transportation", "Warehousing", "Drayage"];
  const [index, setIndex] = useState(0);
  const [animationFlags, setAnimationFlags] = useState(
    Array(words.length).fill(false)
  );
  // const partnerships = [
  //   image1,
  //   image2,
  //   image3,
  //   image4,
  //   image5,
  //   image6,
  //   image7,
  //   image8,
  //   image9,
  // ];

  const sections = [
    "service",
    "shippingService",
    "streamSection",
    "about",
    "streamSection2",
  ];
  const streamQueries = []; // all streams on page will be populated here
  const [streamIndex, setStreamIndex] = useState(0);

  // Function to be called when scrolling occurs
  const handleScroll = () => {
    const fixedElementTopPosition = $(".fixed").offset().top;

    // console.log("current stream index", streamIndex);
    // calculation of nth stream
    if (!$(`${streamQueries[streamIndex]}`).length) return;

    const elementTopPosition = $(`${streamQueries[streamIndex]}`).offset().top;

    if (fixedElementTopPosition >= elementTopPosition) {
      const element = $(`${streamQueries[streamIndex]}`);
      element.css("border-color", "gray");

      const parentHeight = element.parent().height();
      var maxHeightStr = element.css("max-height");

      var maxHeight;

      // Check if max-height is defined as a percentage
      if (maxHeightStr.includes("%")) {
        // If it's a percentage, set maxHeight to the parent's height
        maxHeight = parentHeight;
      } else {
        // If it's not a percentage, parse it to an integer
        maxHeight = parseInt(maxHeightStr, 10);
      }

      let value = Math.abs(fixedElementTopPosition - elementTopPosition);
      let isFullSize = Math.abs(value > maxHeight);

      if (!isFullSize) {
        element.height(value + "px");
      } else {
        element.height(maxHeight);
        if (streamIndex == streamQueries.length - 1) {
          streamQueries.map((query) => {
            $(`${query}`).css("border-color", "#0275d8");
          });
        }
        setStreamIndex(streamIndex + 1);
      }
    } else {
      $(`${streamQueries[streamIndex]}`).css("border-color", "white");
    }
  };

  // Handle animation end for a specific element
  const handleAnimationEnd = (index) => {
    if (!animationFlags[index]) {
      // Mark the element as having completed its first animation
      const newFlags = [...animationFlags];
      newFlags[index] = true;
      setAnimationFlags(newFlags);
    }
  };

  useEffect(() => {
    scroll.scrollToTop({
      smooth: true,
      duration: 0,
    });
    // After a delay, mark all elements as "first animation done"
    const timer = setTimeout(() => {
      setAnimationFlags(Array(words.length).fill(true));
    }, 3000); // Adjust the delay as needed

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // the goal here is to push all of the stream queries inot streamQueries
    sections.forEach((section) => {
      let sectionElement = $(`.${section}`);
      let sectionElements = sectionElement.find("*");
      let count = 1;

      sectionElements.each((index, element) => {
        if (element.classList) {
          const classNames = Array.from(element.classList);
          for (const className of classNames) {
            if (
              className.includes("stream") &&
              $(`.${section} .stream${count}`).length > 0
            ) {
              streamQueries.push(`.${section} .stream${count}`);
              count++;
              break; // Exit the loop when a "stream" class is found
            }
          }
        }
      });
    });

    streamQueries.map((query) => {
      // console.log(query);
      // $(`${query}`).css("border-color", "red");
    });

    // Attach the scroll event listener when the component mounts
    $(window).on("scroll", handleScroll);

    const intervalId = setInterval(() => {
      setIndex((prevIndex) => {
        if (prevIndex + 1 >= words.length) {
          return 0;
        } else {
          return prevIndex + 1;
        }
      });
    }, 3000);

    return () => {
      $(window).off("scroll", handleScroll);
      clearInterval(intervalId);
    };
  }, [streamIndex]);

  return (
    <React.Fragment>
      <div className={`${classes.fixed} fixed`}></div>
      <div className={classes.wrapper}>
        <div className={classes.header}>
          {/* <Loader
            src={hBeyond}
            small={hSmall}
            medium={hMedium}
            large={hLarge}
            classNameProp={classes.loaderHeaderImage}
          /> */}

          <div className={classes.divider}>
            <h1>
              {"Old-School Robust Services "}
              <br />
              <span>
                <h1 style={{ margin: "0px", padding: "0px" }}>With Modern</h1>
              </span>
              <span className={classes["words-wrapper"]}>
                <span>Drayage</span>
                {words.map((word, i) => (
                  <b
                    className={`${
                      index === i
                        ? classes["is-visible"]
                        : animationFlags[i]
                        ? classes["is-hidden-subsequent"]
                        : classes["is-hidden-first"]
                    }`}
                    onAnimationEnd={() => handleAnimationEnd(i)}
                    key={i}
                  >
                    {word}
                  </b>
                ))}
              </span>
              <br />
              You Can Count On!
            </h1>
            <div>
              <Link className={`${classes.button}`} href={"/contact"}>
                Get a Quote!
              </Link>
              <Link className={`${classes.button}`} href={"/contact"}>
                Contact Us
              </Link>
            </div>
          </div>
          <div className={classes.pulseWrapper}>
            <Link href="/contact" className={classes.pulse}>
              <h1>Let's Talk!</h1>
            </Link>
            <div
              className={`${classes["circle"]} ${classes["circle-1"]}`}
            ></div>
            <div
              className={`${classes["circle"]} ${classes["circle-2"]}`}
            ></div>
            <div
              className={`${classes["circle"]} ${classes["circle-3"]}`}
            ></div>
          </div>
        </div>

        <FastMarquee className={classes.marqueeWrapper}>
          {/* {partnerships.map((image, id) => (
            <img src={image} alt="" key={`partnership-${id}`} />
          ))} */}
        </FastMarquee>

        <div className={`${classes.service} ${classes.rev} service`}>
          <div className={`${classes.blueprint} blueprint`}>
            <div
              className={`${classes.stream1} stream1`}
              style={{ maxHeight: "100%" }}
            />
          </div>

          {/* <Loader
            src={wBeyond}
            small={wSmall}
            medium={wMedium}
            large={wLarge}
            classNameProp={classes.serviceImage}
          /> */}

          <div className={classes.serviceContent}>
            <h1>{"Why V&Y Horizon?"}</h1>
            <span>
              We do what we say, we do not overpromise or inflate our commitment
              but work with a deep integrity. Whether you need LTL Cartage,
              Drayage, dry goods or refrigerated, etc., you are covered and we
              strive for you to be surprised with our level of commitment to
              customer service. Serving the PNW since 2015, we are a Husband and
              Wife owned company which sets us apart due to the values we hold
              such as trust, integrity, and diligency. Companies like SAIA and
              XPO Logistics partner with us because of our honest and major
              focus on communication — which is highly overlooked in
              transportation.
            </span>
            <Link className={`${classes.serviceBtn}`} href={"/services"}>
              Learn more
            </Link>
          </div>
        </div>
      

        <div className={`${classes.shippingService} shippingService`}>
          <span>SHIPPING SERVICES</span>
          <div className={`${classes.stream1} stream1`} />
          <h1>
            Shipping Services to fill your logistics and transportation
            operations
          </h1>
          <div className={`${classes.stream2} stream2`} />

          {/* <Loader
            src={mBeyond}
            small={mSmall}
            medium={mMedium}
            large={mLarge}
            classNameProp={classes.shippingImage}
          /> */}

          <div className={`${classes.stream3} stream3`} />
          <div style={{ height: "1px", width: "80%", margin: "-10px auto" }}>
            <div
              style={{
                height: "0px",
                borderBottomWidth: "0px",
                borderTopWidth: "2px",
              }}
              className={`${classes.stream4} stream4`}
            />
          </div>
          <div className={classes.streamDivider}>
            <div className={`${classes.stream5} stream5`} />
            <div className={`${classes.stream6} stream6`} />
            <div className={`${classes.stream7} stream7`} />
          </div>
          <div className={classes.cards}>
            <div className={`${classes.card}`}>
              <h1>Rail & Port Drayage</h1>
              <p>
                Transporting goods from ports or rail with V&Y Horizon is made
                easy and clean. We are set up with all major companies that
                specialize in ports/rail ensuring smooth logistics. In addition,
                our commitment to clear communication means that you will be
                updated every step of the way.
              </p>
              <Link className={`${classes.button}`} href={"/contact"}>
                Learn more
              </Link>
            </div>
            <div className={`${classes.card}`}>
              <h1>Over the Road</h1>
              <p>
                At V&Y Horizon, we handle all sorts of operations, whether it's
                expedited, dry freight, refrigerated, drop-trailer, or
                LTL/Partial shipping. If you've got something else in mind, give
                us a call and we’ll see what can do.
              </p>
              <Link className={`${classes.button}`} href={"/services"}>Learn more</Link>
            </div>
            <div className={`${classes.card}`}>
              <h1>Less-Than-Truckload Cartage</h1>
              <p>
                We provide robust Less-Than-Truckload Cartage (LTL) services.
                Major LTL shipping companies choose us as their cartage partner
                because of our deep-seated commitment to clear communication and
                our hard-working customer service.
              </p>
              <Link className={`${classes.button}`} href={"/services"} >Learn more</Link>
            </div>
          </div>
        </div>
        <div className={`${classes.streamSection} streamSection`}>
          <div className={`${classes.stream1} stream1`} />
        </div>
        <div className={`${classes.about} about`} id="section1">
          <span>What we do</span>
          {/* <div style={{ height: "30px", margin: "-40px auto" }}> */}
          <div className={`${classes.stream1} stream1`} />
          {/* </div> */}
          <h1>Communication Matters To Us</h1>
          {/* <div style={{ height: "30px", margin: "-40px auto" }}> */}
          <div className={`${classes.stream2} stream2`} />
          {/* </div> */}
          <span>
            Communication is number one in transportation, often missed and
            overlooked. We put it as a corner stone of our business philosophy
            and listening is what we strive to do to ensure we can meet your
            shipping needs. We maintain a dilligent commitment to transparency
            and integrity from project start-to-finish. As a family-owned
            business, we instill these core values of trust throughout our
            entire company.
          </span>
        </div>
        <div className={`${classes.streamSection2} streamSection2`}>
          <div className={`${classes.stream1} stream1`} />
        </div>
        <AnimationOnScroll animateIn="animate__fadeIn">
          <div className={classes.bottomHeader}>
            {/* <Loader
              src={oBeyond}
              small={oSmall}
              medium={oMedium}
              large={oLarge}
              classNameProp={classes.image}
            /> */}
            <div className={classes.dividerWrapper}>
              <div className={classes.divider}>
                <span>JOIN OUR TEAM</span>
                <div>
                  <h1>Careers at V&Y Horizon</h1>
                  <span>
                    At V&Y Horizon, we build, find, and recruit top
                    transportation talent -- be a part of our team!
                  </span>
                </div>
                <Link className={`btn ${classes.button}`} href={"/careers"}>
                  Join Our Team
                </Link>
              </div>
            </div>
          </div>
          <Reviews />
        </AnimationOnScroll>
        <AnimationOnScroll animateIn="animate__fadeIn">
          <Contact />
        </AnimationOnScroll>

        <AnimationOnScroll animateIn="animate__fadeIn">
          <Footer />
        </AnimationOnScroll>
      </div>
    </React.Fragment>
  );
}
