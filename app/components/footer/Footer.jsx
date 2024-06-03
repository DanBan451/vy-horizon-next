"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

// import logo from "../../images/company-logo.png";
// import facebookIcon from "./images/facebook.svg";
// import instagramIcon from "./images/instagram.svg";
// import linkedInIcon from "./images/linkedin.svg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";

import classes from "./footer.module.css";
import { GraphQLClient, gql } from "graphql-request";

export default function FooterComponent() {  
  // const [logo, setLogo] = useState("");
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const graphcms = new GraphQLClient(
      "https://api-us-east-1-shared-usea1-02.hygraph.com/v2/cln1nhn7k0cnl01us2gnc06e4/master"
    );
    const QUERY = gql`
      {
        homes {
          companyLogo {
            url
          }
          footerContent
        }
      }
    `;

    async function fetchData() {
      try {
        const { homes } = await graphcms.request(QUERY);

        // setLogo(homes[0].companyLogo.url);
        setData(homes[0]);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <React.Fragment>
      <div className={classes.footerWrapper}>

        {isLoading ? (
          <div />
        ) : (
          <div className={classes.footer}>
            <div className={classes.brand}>
              <img src={data.companyLogo.url} alt="" />
              <ul className={classes.icons}>
                <h1 style={{ color: "black" }}>Follow Us</h1>
                <div>
                  <a href="">
                    <FontAwesomeIcon
                      icon={faLinkedin}
                      color="#005cac"
                      fontSize={30}
                      className="blue-chevron"
                    />
                  </a>
                </div>
              </ul>
            </div>
            <div className={classes.links}>
              <ul>
                <li>Quick Links</li>
                <li>
                  <Link href="/home">Home</Link>
                </li>
                <li>
                  <Link href="/about">About</Link>
                </li>
                <li>
                  <Link href="/services">Our Services</Link>
                </li>
                <li>
                  <Link href="/contact">Contact Us</Link>
                </li>
                <li>
                  <Link href="/careers">Careers</Link>
                </li>
                <li>
                  <Link href="/contact">Get a Quote</Link>
                </li>
              </ul>
            </div>
            <div className={classes.contact}>
              <ul>
                <li>Contact Information</li>
                <li>
                  <strong>Phone</strong>: {data.footerContent[0]}
                </li>
                <li>
                  <strong>Email</strong>: {data.footerContent[1]}
                </li>
                <li>
                  <strong>Fax</strong>: {data.footerContent[2]}
                </li>
                <li>
                  <strong>Address:</strong> {data.footerContent[3]} <br />                  
                </li>                
                <li>
                  <strong>Office Hours:</strong> {data.footerContent[4]}
                </li>
                <li>
                  For emergency/ after-hours inquiries, customer
                  <br />
                  service representive is available 24/7.
                </li>
              </ul>
            </div>
            <ul className={classes.icons}>
              <h1>Follow us</h1>
              <div>
                <a href="">
                  {" "}
                  <FontAwesomeIcon
                    icon={faLinkedin}
                    color="#005cac"
                    fontSize={30}
                    className="blue-chevron"
                  />
                </a>
              </div>
            </ul>
          </div>
        )}
      </div>
      <div className={classes.copyright}>
        <span>
          {"© Copyright 2022 by V&Y Horizon."}
          <br />
          {"All rights reserved."}
        </span>
      </div>
    </React.Fragment>
  );
}
