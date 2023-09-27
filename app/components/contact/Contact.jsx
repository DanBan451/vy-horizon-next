import React from "react";
import classes from "./contact.module.css";
import Link from "next/link";


export default function Contact() {
  return (
    <div className={classes.contact}>
      <span>GET IN TOUCH</span>
      <h1>
        We look forward to <br />
        hearing from you!
      </h1>
      <Link className={classes.button} href="/contact">Contact Us</Link>
    </div>
  );
}
