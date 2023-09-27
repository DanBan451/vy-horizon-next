import React from "react";

import Link from "next/link";

// import logo from "../../images/company-logo.png";
// import facebookIcon from "../../images/socials/facebook.svg";
// import instagramIcon from "../../images/socials/instagram.svg";
// import linkedInIcon from "../../images/socials/linkedin.svg";

import classes from "./footer.module.css";
import { useTranslation } from "react-i18next";

export default function FooterComponent() {
  const { t } = useTranslation();
  return (
    <React.Fragment>
      <div className={classes.footerWrapper}>
        <div className={classes.footer}>
          <div className={classes.brand}>
            {/* <img src={logo} alt="" /> */}
            <ul className={classes.icons}>
              <h1 style={{ color: "black" }}>Follow Us</h1>
              <div>
                <a href="">
                  {/* <img src={facebookIcon} /> */}
                </a>
                <a href="">
                  {/* <img src={linkedInIcon} /> */}
                </a>
                <a href="">
                  {/* <img src={instagramIcon} /> */}
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
                <strong>Phone</strong>: (123) 456-7890
              </li>
              <li>
                <strong>Email</strong>: contact@vytrucking.com
              </li>
              <li>
                <strong>Fax</strong>: (123) 456-7890
              </li>
              <li>
                <strong>Corporate office & Warehouse Address:</strong>: <br />
                example address
              </li>
              <li>
                <strong>Warehouse Address</strong>: example address
              </li>
              <li>
                <strong>Office Hours:</strong>: exmaple office hours
              </li>
              <li>
                For emergency/ after-hours inquiries, customer
                <br />
                service representive is available 24/7.
              </li>
            </ul>
          </div>
          <ul className={classes.icons}>
            <h1>{t("footer.header-h1")}</h1>
            <div>
              <a href="">
                {/* <img src={facebookIcon} /> */}
              </a>
              <a href="">
                {/* <img src={linkedInIcon} /> */}
              </a>
              <a href="">
                {/* <img src={instagramIcon} /> */}
              </a>
            </div>
          </ul>
        </div>
      </div>
      <div className={classes.copyright}>
        <span>
          {"© Copyright 2022 by V&Y Horizon."}
          <br />
          {t("footer.copyright-2")}
        </span>
      </div>
    </React.Fragment>
  );
}
