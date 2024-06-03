"use client";
import React, { useEffect, useState } from "react";

import Joi from "joi-browser";
import Input from "../components/input/Input";
import Loader from "../components/loader/Loader";
import emailjs from "emailjs-com";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { animateScroll as scroll } from "react-scroll";
import { AnimationOnScroll } from "react-animation-on-scroll";

import classes from "./careers.module.css";
import loadingClasses from "../components/loading/loading.module.css";
import Link from "next/link";
import { GraphQLClient, gql } from "graphql-request";

const schema = {
  firstName: Joi.string().required().label("First Name"),
  lastName: Joi.string().required().label("Last Name"),
  email: Joi.string().required().email({ allowTld: true }).label("Email"),
  phone: Joi.number().required().label("Phone"),
  description: Joi.string().min(25).max(500).required().label("Message"),
};

export default function Careers() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const [dataForm, setAccount] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    description: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    scroll.scrollToTop({
      smooth: true,
      duration: 0,
    });
    const graphcms = new GraphQLClient(
      "https://api-us-east-1-shared-usea1-02.hygraph.com/v2/cln1nhn7k0cnl01us2gnc06e4/master"
    );
    const QUERY = gql`
      {
        careers {
          mainHeaderImage {
            url
          }
          mainHeaderContent
          section1Image {
            url
          }
          section1Content
          section2Content
          section2Image1 {
            url
          }
          section2Image2 {
            url
          }
          section2Image3 {
            url
          }
          section2Image4 {
            url
          }
        }
      }
    `;
    async function fetchData() {
      try {
        const { careers } = await graphcms.request(QUERY);
        console.log(`(Careers) Here is the element from the server:`);
        console.log(careers);

        setData(careers[0]);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validate();
    setErrors(errors);
    if (errors) return;

    // call server
    // emailjs
    //   .sendForm(
    //     "service_l080czw",
    //     "template_kjwh8zl",
    //     e.target,
    //     "HPTwBnzpPBp6w8zW0"
    //   )
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => console.log(err));

    toast.success(t("careers.toastMessage"));
    var form = document.getElementById("application-form");
    var elements = form.elements;
    for (var i = 0, len = elements.length; i < len; ++i) {
      elements[i].readOnly = true;
    }
    setSubmitted(true);
  };
  const handleChange = ({ target }) => {
    const { name, value } = target;
    const error = validateProperty(name, value);

    setErrors({
      ...errors,
      [name]: error,
    });

    setAccount({
      ...dataForm,
      [name]: value !== undefined ? value : "",
    });
  };
  const validate = () => {
    const errors = {};
    const options = {
      abortEarly: false,
    };
    let { error: result } = Joi.validate(dataForm, schema, options);

    if (result) {
      result.details.forEach((element) => {
        errors[element.context.key] = element.message;
      });
      console.log(errors);
      return errors;
    }
    return null;
  };
  const validateProperty = (name, value) => {
    let obj = { [name]: value };
    let subSchema = { [name]: schema[name] };

    let { error } = Joi.validate(obj, subSchema);

    return error ? error.details[0].message : null;
  };
  const handleCaptchaComplete = () => {
    setAccount({
      ...dataForm,
      ["captcha"]: "complete",
    });
  };

  return (
    <div className={classes.wrapper}>
      <ToastContainer />
      <div className={classes.careers}>
        {isLoading ? (
          <div className={`${loadingClasses.loading} ${classes.header}`} />
        ) : (
          <div className={classes.header}>
            <div className={classes.content}>
              <h1>{data.mainHeaderContent[0]}</h1>
              <a className={classes.button} href={"#form"}>
                {data.mainHeaderContent[1]}
              </a>
            </div>
            <Loader
              src={data.mainHeaderImage[3].url}
              small={data.mainHeaderImage[0].url}
              medium={data.mainHeaderImage[1].url}
              large={data.mainHeaderImage[2].url}
              classNameProp={classes.headerImage}
            />
          </div>
        )}

        {isLoading ? (
          <div
            className={`${loadingClasses.loading} ${classes.description}`}
            style={{ height: "15vh" }}
          />
        ) : (
          <p className={classes.description}>
            {data.mainHeaderContent[2]} <span>{data.mainHeaderContent[3]}</span>{" "}
            {data.mainHeaderContent[4]}
          </p>
        )}

        {isLoading ? (
          <div className={`${loadingClasses.loading} ${classes.banner}`} />
        ) : (
          <AnimationOnScroll animateIn="animate__fadeIn">
            <div
              className={classes.banner}
              style={{ backgroundImage: `url('${data.section1Image[2].url}')` }}
            >
              <h1>
                <strong>{data.section1Content[0]}</strong>
                <br /> {data.section1Content[1]}
              </h1>
            </div>
          </AnimationOnScroll>
        )}

        {isLoading ? (
          <div
            className={`${loadingClasses.loading} ${classes.description2}`}
            style={{ height: "15vh" }}
          />
        ) : (
          <AnimationOnScroll animateIn="animate__fadeIn">
            <p className={classes.description2}>
              What's your passion? Check out and check one of the tabs below!
            </p>
          </AnimationOnScroll>
        )}

        <AnimationOnScroll animateIn="animate__fadeIn">
          <ul className={classes.careerList}>
            {isLoading ? (
              <div
                className={`${loadingClasses.loading} ${classes.career}`}
                style={{ height: "50vh" }}
              />
            ) : (
              <div className={classes.career}>
                <Loader
                  src={data.section2Image1[3].url}
                  small={data.section2Image1[0].url}
                  medium={data.section2Image1[1].url}
                  large={data.section2Image1[2].url}
                  classNameProp={classes.image}
                />
                <div>
                  <h1>{data.section2Content[0]}</h1>
                  <p>{data.section2Content[1]}</p>
                  <a className={classes.button} href={"#form"}>
                    {data.section2Content[2]}
                  </a>
                </div>
              </div>
            )}
            {isLoading ? (
              <div
                className={`${loadingClasses.loading} ${classes.career}`}
                style={{ height: "50vh" }}
              />
            ) : (
              <div className={classes.career}>
                <Loader
                  src={data.section2Image2[3].url}
                  small={data.section2Image2[0].url}
                  medium={data.section2Image2[1].url}
                  large={data.section2Image2[2].url}
                  classNameProp={classes.image}
                />
                <div>
                  <h1>{data.section2Content[3]}</h1>
                  <p>{data.section2Content[4]}</p>
                  <a className={classes.button} href={"#form"}>
                    {data.section2Content[5]}
                  </a>
                </div>
              </div>
            )}
            {isLoading ? (
              <div
                className={`${loadingClasses.loading} ${classes.career}`}
                style={{ height: "50vh" }}
              />
            ) : (
              <div className={classes.career}>
                <Loader
                  src={data.section2Image3[3].url}
                  small={data.section2Image3[0].url}
                  medium={data.section2Image3[1].url}
                  large={data.section2Image3[2].url}
                  classNameProp={classes.image}
                />
                <div>
                  <h1>{data.section2Content[6]}</h1>
                  <p>{data.section2Content[7]}</p>
                  <a className={classes.button} href={"#form"}>
                    {data.section2Content[8]}
                  </a>
                </div>
              </div>
            )}
            {isLoading ? (
              <div
                className={`${loadingClasses.loading} ${classes.career}`}
                style={{ height: "50vh" }}
              />
            ) : (
              <div className={classes.career}>
                <Loader
                  src={data.section2Image4[3].url}
                  small={data.section2Image4[0].url}
                  medium={data.section2Image4[1].url}
                  large={data.section2Image4[2].url}
                  classNameProp={classes.image}
                />
                <div>
                  <h1>{data.section2Content[9]}</h1>
                  <p>{data.section2Content[10]}</p>
                  <a className={classes.button} href={"#form"}>
                    {data.section2Content[11]}
                  </a>
                </div>
              </div>
            )}
          </ul>
        </AnimationOnScroll>

        {isLoading ? (
          <div className={`${loadingClasses.loading}`} />
        ) : (
          <div id={"form"} className={classes.formWrapper}>
            <AnimationOnScroll animateIn="animate__fadeIn">
              <h1 className={classes.title}>Contact Us Today!</h1>
              <div className={classes["modal-content"]}>
                <form
                  id="application-form"
                  className={classes.form}
                  onSubmit={handleSubmit}
                  style={{ opacity: submitted ? 0.5 : 1 }}
                >
                  <Input
                    name="firstName"
                    value={dataForm.firstName}
                    onChange={handleChange}
                    label={"Name"}
                    placeholder={"John"}
                    error={errors?.firstName}
                    classes={classes}
                  />
                  <Input
                    name="lastName"
                    value={dataForm.lastName}
                    onChange={handleChange}
                    label={"Last Name"}
                    placeholder={"Doe"}
                    error={errors?.lastName}
                    classes={classes}
                  />
                  <Input
                    name="email"
                    value={dataForm.email}
                    onChange={handleChange}
                    label={"Email"}
                    placeholder={"johndoe@domain.com"}
                    error={errors?.email}
                    classes={classes}
                  />
                  <Input
                    name="phone"
                    value={dataForm?.phone}
                    onChange={handleChange}
                    label={"Phone Number"}
                    placeholder={"(123) 456-7890"}
                    error={errors?.phone}
                    classes={classes}
                  />
                  <div className={[classes.textArea]}>
                    <label className={classes.label}>Message</label>
                    <textarea
                      name="description"
                      value={dataForm?.description}
                      id=""
                      cols="30"
                      rows="10"
                      placeholder={
                        "Tell us about yourself and career interests at V&Y Horizon"
                      }
                      onChange={handleChange}
                    />
                    {errors?.description && (
                      <div
                        className={`alert alert-danger m-0 mb-3 ${classes.error}`}
                      >
                        {errors?.description}
                      </div>
                    )}
                  </div>
                  <button
                    className={"btn btn-primary btn-sm"}
                    type="submit"
                    disabled={submitted || validate()}
                  >
                    {"Submit"}
                  </button>
                </form>
              </div>
            </AnimationOnScroll>
            <AnimationOnScroll animateIn="animate__fadeIn">
              <div className={classes.careerFooter}>
                <span>Please dont forget to follow us</span>
                <ul className="social-links">
                  <li>
                    <Link className={classes.icon} href={"https://www.linkedin.com/feed/"}>
                      <FontAwesomeIcon
                        icon={faLinkedin}
                        color="#005cac"
                        fontSize={30}
                        className="blue-chevron"
                      />
                      <span>V&Y Horizon @ LinkedIn</span>
                    </Link>
                  </li>
                </ul>
                <span>Thank you!</span>
              </div>
            </AnimationOnScroll>
          </div>
        )}
      </div>
    </div>
  );
}
