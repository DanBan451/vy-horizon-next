"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { animateScroll as scroll } from "react-scroll";
import Loader from "../components/loader/Loader";
import { AnimationOnScroll } from "react-animation-on-scroll";

import classes from "./services.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import loadingClasses from "../components/loading/loading.module.css";

import { GraphQLClient, gql } from "graphql-request";

export default function Services() {
  const [data, setData] = useState({});
  const [capacityContent, setCapacityContent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
    const graphcms = new GraphQLClient(
      "https://api-us-east-1-shared-usea1-02.hygraph.com/v2/cln1nhn7k0cnl01us2gnc06e4/master"
    );
    const QUERY = gql`
      {
        services {
          mainHeaderImage {
            url
          }
          mainHeaderText
          section1Image {
            url
          }
          section1Content
          section2Image {
            url
          }
          section2Content
          section3Image {
            url
          }
          section3Content
        }
      }
    `;
    async function fetchData() {
      try {
        // scroll.scrollToTop({
        //   smooth: true,
        //   duration: 0,
        // });
        const { services } = await graphcms.request(QUERY);

        let capacityContent = [];
        for (let i = 1; i < services[0].section3Content.length; i += 2) {
          let arr = [];
          arr.push(services[0].section3Content[i]);
          arr.push(services[0].section3Content[i + 1]);
          capacityContent.push(arr);
        }
        console.log(capacityContent);
        setData(services[0]);
        setCapacityContent(capacityContent);

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  // if (isLoading) {
  //   return <div className={loadingClasses.loading} />;
  // }

  function getImageForScreenWidth() {
    const screenWidth = window.innerWidth;

    // Define different image URLs for different screen widths
    if (screenWidth <= 400) {
      return `${data.section1Image[0].url}`;
    } else if (screenWidth <= 800) {
      return `${data.section1Image[1].url}`;
    } else if (screenWidth <= 1200) {
      return `${data.section1Image[2].url}`;
    } else {
      return `${data.section1Image[3].url}`;
    }
  }

  return (
    <div className={classes.servicesWrapper}>
      {isLoading ? (
        <div className={`${loadingClasses.loading} ${classes.header}`} />
      ) : (
        <React.Fragment>
          <div className={classes.header}>
            <Loader
              src={data.mainHeaderImage[3].url}
              small={data.mainHeaderImage[0].url}
              medium={data.mainHeaderImage[1].url}
              large={data.mainHeaderImage[2].url}
              classNameProp={classes.image}
            />
            <h1>
              {data.mainHeaderText[0]}
              <br />
              {data.mainHeaderText[1]}
            </h1>
          </div>
          <a className={classes.scrollButton} href={"#shipping"}>
            <FontAwesomeIcon
              icon={faChevronDown}
              color="black"
              fontSize={40}
              className="blue-chevron"
            />
          </a>
        </React.Fragment>
      )}

      {isLoading ? (
        <div
          className={`${loadingClasses.loading} ${classes.shipping}`}
          style={{ marginTop: 100 }}
        />
      ) : (
        <AnimationOnScroll animateIn="animate__fadeIn">
          <div className={classes.shipping} id={"shipping"}>
            <div className={classes.content}>
              <h1>
                {data.section1Content[0]} <br />
                {data.section1Content[1]}
              </h1>
              <p>{data.section1Content[2]}</p>
            </div>
            <div
              className={classes.shippingImageAfter}
              style={{
                backgroundImage: `url('${getImageForScreenWidth()}')`,
              }}
            />
          </div>
        </AnimationOnScroll>
      )}

      <AnimationOnScroll animateIn="animate__fadeIn">
        <div className={classes.fleet}>
          {isLoading ? (
            <div
              className={`${loadingClasses.loading}`}
              style={{ marginBottom: 30, height: "5vh" }}
            />
          ) : (
            <h1>{data.section2Content[0]}</h1>
          )}

          <div className={classes.cards}>
            {isLoading ? (
              <div
                className={`${loadingClasses.loading} ${classes.card}`}
                style={{ height: "40vh" }}
              />
            ) : (
              <div className={classes.card}>
                <Loader
                  src={data.section2Image[3].url}
                  small={data.section2Image[0].url}
                  medium={data.section2Image[1].url}
                  large={data.section2Image[2].url}
                  classNameProp={classes.image}
                />
                <h1>{data.section2Content[1]}</h1>
                <p>{data.section2Content[2]}</p>
                <Link className={`${classes.button}`} href="/contact">
                  Request a Quote
                </Link>
              </div>
            )}
            {isLoading ? (
              <div className={`${loadingClasses.loading} ${classes.card}`} />
            ) : (
              <div className={classes.card}>
                <Loader
                  src={data.section2Image[7].url}
                  small={data.section2Image[4].url}
                  medium={data.section2Image[5].url}
                  large={data.section2Image[6].url}
                  classNameProp={classes.image}
                />
                <h1>{data.section2Content[3]}</h1>
                <p>{data.section2Content[4]}</p>
                <Link className={`${classes.button}`} href="/contact">
                  Request a Quote
                </Link>
              </div>
            )}
            {isLoading ? (
              <div className={`${loadingClasses.loading} ${classes.card}`} />
            ) : (
              <div className={classes.card}>
                <Loader
                  src={data.section2Image[9].url}
                  small={data.section2Image[9].url}
                  medium={data.section2Image[9].url}
                  large={data.section2Image[9].url}
                  classNameProp={classes.image}
                />
                <h1>{data.section2Content[5]}</h1>
                <p>{data.section2Content[6]}</p>
                <Link className={`${classes.button}`} href="/contact">
                  Request a Quote
                </Link>
              </div>
            )}
          </div>
        </div>
      </AnimationOnScroll>

      <AnimationOnScroll animateIn="animate__fadeIn">
        <div className={classes.capacity}>
          {isLoading ? (
            <div
              className={`${loadingClasses.loading}`}
              style={{ marginBottom: 30, height: "5vh" }}
            />
          ) : (
            <h1>{data.section3Content[0]}</h1>
          )}

          {isLoading ? (
            <div className={`${loadingClasses.loading} ${classes.image}`} />
          ) : (
            <Loader
              src={data.section3Image[3].url}
              small={data.section3Image[0].url}
              medium={data.section3Image[1].url}
              large={data.section3Image[2].url}
              classNameProp={classes.image}
            />
          )}

          <div className={classes.cards}>
            {capacityContent.map((content, index) =>
              isLoading ? (
                <div
                  key={index} // Added a unique key for each div in the map
                  className={`${loadingClasses.loading} ${classes.card}`}
                  style={{ height: "40vh" }}
                />
              ) : (
                <div key={index} className={classes.card}>
                  <h1>{content[0]}</h1>
                  <p>{content[1]}</p>
                </div>
              )
            )}
          </div>
          
          {/* <div className={classes.cards}>
            {capacityContent.map((content) => {
              isLoading ? (
                <div
                  className={`${loadingClasses.loading} ${classes.card}`}
                  style={{ height: "40vh" }}
                />
              ) : (
                <div className={classes.card}>
                  <h1>{content[0]}</h1>
                  <p>{content[1]}</p>
                </div>
              );
            })} */}

            {/* {isLoading ? (
              <div className={`${loadingClasses.loading} ${classes.card}`} />
            ) : (
              <div className={classes.card}>
                <h1>{data.section3Content[3]}</h1>
                <p>{data.section3Content[4]}</p>
              </div>
            )}
            {isLoading ? (
              <div className={`${loadingClasses.loading} ${classes.card}`} />
            ) : (
              <div className={classes.card}>
                <h1>{data.section3Content[5]}</h1>
                <p>{data.section3Content[6]}</p>
              </div>
            )} */}
          {/* </div> */}
        </div>
      </AnimationOnScroll>

      {isLoading ? (
        <div
          className={`${loadingClasses.loading}`}
          style={{ height: "50vh", marginBottom: "5vh" }}
        />
      ) : (
        <div className={classes.serviceFooter}>
          <span>REQUEST A QUOTE TODAY</span>
          <h1>
            Select the ideal freight mode for your
            <br />
            cargo with V&Y Horizon.
          </h1>
          <Link className={`${classes.button}`} href={"/contact"}>
            Get a Quote!
          </Link>
        </div>
      )}
    </div>
  );
}
