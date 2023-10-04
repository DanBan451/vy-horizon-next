"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { animateScroll as scroll } from "react-scroll";
import Loader from "../components/loader/Loader";
import { AnimationOnScroll } from "react-animation-on-scroll";

import classes from "./services.module.css";
import loadingClasses from "../components/loading/loading.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";

import { GraphQLClient, gql } from "graphql-request";

export default function Services() {
  const [data, setData] = useState({});
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
        console.log(`Here is the element from the server:`);
        console.log(services);

        setData(services[0]);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  if (isLoading) {
    return <div className={loadingClasses.loading} />;
  }

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

  console.log(data.section1Image[0]);

  return (
    <div className={classes.servicesWrapper}>
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
          icon="chevron-down"
          color="black"
          fontSize={40}
          className="blue-chevron"
        />
      </a>

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

      <AnimationOnScroll animateIn="animate__fadeIn">
        <div className={classes.fleet}>
          <h1>{data.section2Content[0]}</h1>
          <div className={classes.cards}>
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
          </div>
        </div>
      </AnimationOnScroll>

      <AnimationOnScroll animateIn="animate__fadeIn">
        <div className={classes.capacity}>
          <h1>{data.section3Content[0]}</h1>
          <Loader
            src={data.section3Image[3].url}
            small={data.section3Image[0].url}
            medium={data.section3Image[1].url}
            large={data.section3Image[2].url}
            classNameProp={classes.image}
          />
          <div className={classes.cards}>
            <div className={classes.card}>
              <h1>{data.section3Content[1]}</h1>
              <p>{data.section3Content[2]}</p>
            </div>
            <div className={classes.card}>
              <h1>{data.section3Content[3]}</h1>
              <p>{data.section3Content[4]}</p>
            </div>
            <div className={classes.card}>
              <h1>{data.section3Content[5]}</h1>
              <p>{data.section3Content[6]}</p>
            </div>
          </div>
        </div>
      </AnimationOnScroll>

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
    </div>
  );
}
