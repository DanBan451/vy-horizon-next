"use client";
import React, { useEffect, useState } from "react";
import { Link } from "next/link";
import { AnimationOnScroll } from "react-animation-on-scroll";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { animateScroll as scroll } from "react-scroll";
import Loader from "../components/loader/Loader";
import classes from "./about.module.css";
import Contact from "../components/contact/Contact";

import loadingClasses from "../components/loading/loading.module.css";

import { GraphQLClient, gql } from "graphql-request";

export default function About({ navigation }) {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const graphcms = new GraphQLClient(
      "https://api-us-east-1-shared-usea1-02.hygraph.com/v2/cln1nhn7k0cnl01us2gnc06e4/master"
    );
    const QUERY = gql`
      {
        abouts {
          id
          section1Content
          image {
            url
          }
          section2Content
          section3Content
        }
      }
    `;

    async function fetchData() {
      try {
        const { abouts } = await graphcms.request(QUERY);        

        setData(abouts[0]);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();

    scroll.scrollToTop({
      smooth: true,
      duration: 0,
    });
  }, []);

  // if (isLoading) {
  //   return (
  //     <div className={loadingClasses.loading} />
  //   );
  // }

  return (
    <div id={classes.about}>
      {isLoading ? (
        <div className={`${loadingClasses.loading} ${classes.header}`} />
      ) : (
        <div className={classes.header}>
          <div>
            <h1>{data.section1Content[0]}</h1>
            <p>{data.section1Content[1]}</p>
            <a className={classes.button} href={"#mission"}>
              <FontAwesomeIcon
                icon={faChevronDown}
                color="#005cac"
                fontSize={30}
                className="blue-chevron"
              />
            </a>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className={`${loadingClasses.loading} ${classes.image}`} style={{ marginTop: 100 }} />
      ) : (
        <AnimationOnScroll animateIn="animate__fadeIn">
          <Loader
            src={data.image[3].url}
            small={data.image[0].url}
            medium={data.image[1].url}
            large={data.image[2].url}
            classNameProp={classes.image}
            id={"mission"}
          />
        </AnimationOnScroll>
      )}

      {isLoading ? (
        <div className={`${loadingClasses.loading} ${classes.mission}`} style={{ marginTop: 100 }} />
      ) : (
        <AnimationOnScroll animateIn="animate__fadeIn">
          <div className={classes.mission}>
            <span>OUR MISSION</span>
            <p>
              Our mission at V&Y Horizon is to provide you with old-school
              robust services with modern transportation — rail & port drayage,
              over-the-road operations, less-than-truckload cartage — you can
              rely on. We are dedicated to providing hassle-free service with
              clear communication every step of the way.
            </p>
          </div>
        </AnimationOnScroll>
      )}

      {isLoading ? (
        <div className={`${loadingClasses.loading} ${classes.values}`} style={{ height: '100vh' }} />
      ) : (
        <AnimationOnScroll animateIn="animate__fadeIn">
          <div className={classes.values}>
            <h1>Our Core Values</h1>
            <div className={classes.card}>
              <h1>1</h1>
              <div>
                <span>Safety First & Always</span>
                <p>
                  We operate on a Safety First & Always standard, from start to
                  finish. We strive to enhance the well-being of our employees,
                  protect our cargo, as well as the greater community. We are
                  continously improving our safety protocals to ensure that no
                  one gets hurt.
                </p>
              </div>
            </div>
            <div className={classes.card}>
              <h1>2</h1>
              <div>
                <span>Community Aware</span>
                <p>
                  In all of our transportation operations, we are mindful of our
                  community. At V&Y Horizon we partner with major companies such
                  as SmartWay Transport, which stands by “Getting there with
                  cleaner air.”
                </p>
              </div>
            </div>
            <div className={classes.card}>
              <h1>3</h1>
              <div>
                <span>Clear Communication</span>
                <p>
                  We have said before, and we will say it again: Clear
                  Communication is our all. We are transparent upfront and
                  ensure that you have no surprises — other than exceptinal
                  transportation & customer service from our end.
                </p>
              </div>
            </div>
          </div>
        </AnimationOnScroll>
      )}

      {isLoading ? (
        <div className={`${loadingClasses.loading}`} style={{ height: '30vh', marginBottom: '3vh' }} />
      ) : (
        <AnimationOnScroll animateIn="animate__fadeIn">
          <Contact />
        </AnimationOnScroll>
      )}










      {/* <div className={classes.content}>
        <div className={classes.description}>
          <p>
            {t('about.content.p_1')}
            <br/><br/>{t('about.content.p_2')}
          </p>
        </div>
        <div className={classes.features}>
          <h1>{t('about.features.h1')}</h1>
          <ul>
            <li>
              <img src={arrow} alt="" />
              {t('about.features.span_1')}
            </li>
            <li>
              <img src={arrow} alt="" />
              {t('about.features.span_2')}
            </li>
            <li>
              <img src={arrow} alt="" />
              {t('about.features.span_3')}
            </li>
            <li>
              <img src={arrow} alt="" />
              {t('about.features.span_4')}
            </li>
            <li>
              <img src={arrow} alt="" />
              {t('about.features.span_5')}
            </li>
            <li>
              <img src={arrow} alt="" />
              {t('about.features.span_6')}
            </li>
            <li>
              <img src={arrow} alt="" />
              {t('about.features.span_7')}
            </li>
            <li>
              <img src={arrow} alt="" />
              {t('about.features.span_8')}
            </li>
            <li>
              <img src={arrow} alt="" />
              {t('about.features.span_9')}
            </li>
            <li>
              <img src={arrow} alt="" />
              {t('about.features.span_10')}
            </li>
            <li>
              <img src={arrow} alt="" />
              {t('about.features.span_11')}
            </li>
            <li>
              <img src={arrow} alt="" />
              {t('about.features.span_12')}
            </li>
            <li>
              <img src={arrow} alt="" />
              {t('about.features.span_13')}
            </li>
            <li>
              <img src={arrow} alt="" />
              {t('about.features.span_14')}
            </li>
          </ul>
        </div>
      </div> */}
      {/* <FooterComponent /> */}
    </div>
  );
}
