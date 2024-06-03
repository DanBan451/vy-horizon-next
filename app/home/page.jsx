"use client";
import React, { useEffect, useState } from "react";
import $ from "jquery";
import Link from "next/link";
import { useRouter } from "next/router";

import { animateScroll as scroll } from "react-scroll";
import { AnimationOnScroll } from "react-animation-on-scroll";

import Reviews from "../components/reviews/Reviews";
import Loader from "../components/loader/Loader";
import Contact from "../components/contact/Contact";
import Footer from "../components/footer/Footer";
import FastMarquee from "react-fast-marquee";

import classes from "./home.module.css";
import "animate.css/animate.min.css";
import loadingClasses from "../components/loading/loading.module.css";

import { GraphQLClient, gql } from "graphql-request";

export default function Main() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const [words, setWords] = useState([]);
  const sections = [
    "service",
    "shippingService",
    "streamSection",
    "about",
    "streamSection2",
  ];
  const streamQueries = []; // all streams on page will be populated here
  const [streamIndex, setStreamIndex] = useState(0);

  const [index, setIndex] = useState(0);
  const [animationFlags, setAnimationFlags] = useState(
    Array(words.length).fill(false)
  );

  useEffect(() => {
    // router.beforePopState((state) => {
    //   state.options.scroll = false;
    //   return true;
    // });
    // window.onbeforeunload = function () {
    //   window.scrollTo(0, 0);
    // }

    let intialWords = [];

    const graphcms = new GraphQLClient(
      "https://api-us-east-1-shared-usea1-02.hygraph.com/v2/cln1nhn7k0cnl01us2gnc06e4/master"
    );
    const QUERY = gql`
      {
        homes {
          id
          mainHeaderText1
          mainHeaderText2
          mainHeaderText3
          mainHeaderChangingWords
          mainHeaderImage {
            url
          }
          partnershipLogos {
            url
          }
          section1Image {
            url
          }
          section1Content
          section2Image {
            url
          }
          section2Content
          section3Content
          section4Image {
            url
          }
          section4Content
        }
      }
    `;

    async function fetchData() {
      try {
        const { homes } = await graphcms.request(QUERY);

        setData(homes[0]);
        setWords(homes[0].mainHeaderChangingWords);
        setIsLoading(false);
        intialWords = homes[0].mainHeaderChangingWords;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();

    // scroll.scrollToTop({
    //   smooth: true,
    //   duration: 0,
    // });
    // After a delay, mark all elements as "first animation done"
    const timer = setTimeout(() => {
      setAnimationFlags(Array(intialWords.length).fill(true));
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

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

  // if (isLoading) {
  //   return <div className={loadingClasses.loading} />;
  // }

  // ------------------------------------------------------------ if loading of data is complete then render everythng else

  return (    
    <div>
      <div className={`${classes.fixed} fixed`}></div>
      <div className={classes.wrapper}>
        {isLoading ? (
          <div className={`${loadingClasses.loading} ${classes.header}`}></div>
        ) : (
          <div className={classes.header}>
            <Loader
              src={data.mainHeaderImage[3].url}
              small={data.mainHeaderImage[0].url}
              medium={data.mainHeaderImage[1].url}
              large={data.mainHeaderImage[2].url}
              classNameProp={classes.loaderHeaderImage}
            />
            <div className={classes.divider}>
              {words.length ? (
                <React.Fragment>
                  <h1>
                    {`${data.mainHeaderText1} `}
                    <br />
                    <span>
                      <h1
                        style={{ margin: "0px", padding: "0px" }}
                      >{`${data.mainHeaderText2}`}</h1>
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
                    {`${data.mainHeaderText3}`}
                  </h1>
                  <div>
                    <Link className={`${classes.button}`} href={"/contact"}>
                      Get a Quote!
                    </Link>
                    <Link className={`${classes.button}`} href={"/contact"}>
                      Contact Us
                    </Link>
                  </div>
                </React.Fragment>
              ) : (
                <div />
              )}
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
        )}

        <FastMarquee className={classes.marqueeWrapper}>
          {isLoading
            ? Array.from({ length: 5 }, (num, id) => (
                <div
                  className={loadingClasses.loading}
                  style={{ height: "100%", width: 300 }}
                />
              ))
            : data.partnershipLogos.map((logo, id) => (
                <img src={logo.url} alt="" key={`partnership-${id}`} />
              ))}
        </FastMarquee>

        <div className={`${classes.service} ${classes.rev} service`}>
          <div className={`${classes.blueprint} blueprint`}>
            <div
              className={`${classes.stream1} stream1`}
              style={{ maxHeight: "100%" }}
            />
          </div>

          {isLoading ? (
            <div
              className={`${loadingClasses.loading} ${classes.serviceImage}`}
              style={{ width: "100%" }}
            />
          ) : (
            <Loader
              src={data.section1Image[3].url}
              small={data.section1Image[0].url}
              medium={data.section1Image[1].url}
              large={data.section1Image[2].url}
              classNameProp={classes.serviceImage}
            />
          )}

          {isLoading ? (
            <div
              className={`${loadingClasses.loading} ${classes.serviceContent}`}
            />
          ) : (
            <div className={classes.serviceContent}>
              <h1>{data.section1Content[0]}</h1>
              <span>{data.section1Content[1]}</span>
              <Link className={`${classes.serviceBtn}`} href={"/services"}>
                Learn more
              </Link>
            </div>
          )}
        </div>
        {isLoading ? (
          <div className={`${loadingClasses.loading}`} />
        ) : (
          <React.Fragment>
            <div className={`${classes.streamSection} streamSection`}>
              <div className={`${classes.stream1} stream1`} />
            </div>
            <div className={`${classes.about} about`} id="section1">
              <span>{data.section3Content[0]}</span>
              <div className={`${classes.stream1} stream1`} />
              <h1>{data.section3Content[1]}</h1>
              <div className={`${classes.stream2} stream2`} />
              <span>{data.section3Content[2]}</span>
            </div>
            <div className={`${classes.streamSection2} streamSection2`}>
              <div className={`${classes.stream1} stream1`} />
            </div>

            <AnimationOnScroll animateIn="animate__fadeIn">
              <div className={classes.bottomHeader}>
                <Loader
                  src={data.section4Image[3].url}
                  small={data.section4Image[0].url}
                  medium={data.section4Image[1].url}
                  large={data.section4Image[2].url}
                  classNameProp={classes.image}
                />
                <div className={classes.dividerWrapper}>
                  <div className={classes.divider}>
                    <span>{data.section4Content[0]}</span>
                    <div>
                      <h1>{data.section4Content[1]}</h1>
                      <span>{data.section4Content[2]}</span>
                    </div>
                    <Link className={`btn ${classes.button}`} href={"/careers"}>
                      Join Our Team
                    </Link>
                  </div>
                </div>
              </div>
              <Reviews partnershipLogos={data.partnershipLogos} />
              <Contact />
            </AnimationOnScroll>
          </React.Fragment>
        )}
      </div>
    </div>
  );
}
