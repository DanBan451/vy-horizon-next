"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Navbar, Container, Nav, NavLink, Button } from "react-bootstrap";

import { GraphQLClient, gql } from "graphql-request";

import classes from "./navbar.module.css";

function NavBarComponent({ handleOpenModal }) {
  const [logo, setLogo] = useState("");
  const [language, setLanguage] = useState("EN");

  const pathname = usePathname();

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
        }
      }
    `;

    async function fetchData() {
      try {
        const { homes } = await graphcms.request(QUERY);
        setLogo(homes[0].companyLogo.url);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  // console.log(pathname);

  return (
    <div>
      <Navbar
        id={classes.navWrapper}
        expand="xl"
        className={`${classes.navbar}`}
      >
        <Container className={`navbar-inner p-0 ${classes.navbarContainer}`} fluid>
          <Navbar.Brand to="/home" className={classes.logoWrapper}>
            <Link
              style={{ textAlign: "center" }}
              className={`${classes.navLink} ${
                pathname == "/home" ? classes.active : classes.nonActive
              }`}
              href="/home"
            >
              <img src={logo} className={classes.logo} />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle className={classes.navbarToggle} style={{ marginRight: 10 }} aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll" className={classes.navbarCollapseClass}>
            <Nav className={`my-2 my-lg-0 ${classes.navBar}`}>
              <Link
                style={{ textAlign: "center", padding: 15 }}
                className={`${classes.navItem} ${
                  (pathname == "/home" || pathname == "/") ? classes.active : classes.nonActive
                }`}
                id="navlink-home"
                href="/"
              >                
                Home
              </Link>
              <Link
                className={`${classes.navItem} ${
                  pathname == "/about" ? classes.active : classes.nonActive
                }`}
                style={{ textAlign: "center", padding: 15 }}
                href="/about"
                id="navlink-about"
              >
                About
              </Link>
              <Link
                className={`${classes.navItem} ${
                  pathname == "/services" ? classes.active : classes.nonActive
                }`}
                style={{ textAlign: "center", padding: 15 }}
                href="/services"
              >
                Services
              </Link>
              <Link
                className={`${classes.navItem} ${
                  pathname == "/careers" ? classes.active : classes.nonActive
                }`}
                style={{ textAlign: "center", padding: 15 }}
                href="/careers"
              >
                Careers
              </Link>
              <Link
                className={`${classes.navItem} ${
                  pathname == "/contact" ? classes.active : classes.nonActive
                }`}
                style={{ textAlign: "center", padding: 15 }}
                href="/contact"
              >
                Contact
              </Link>
            </Nav>
            <div className="d-flex options-container">
              <NavLink
                className="btn quote-btn"
                href={""}
                onClick={handleOpenModal}
              >
                Get a Quote
              </NavLink>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavBarComponent;
