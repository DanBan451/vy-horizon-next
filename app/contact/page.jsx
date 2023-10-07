"use client";
import React from "react";
import { useState, useEffect } from "react";
import { animateScroll as scroll } from "react-scroll";
import classes from "./contact.module.css";
import Joi from "joi-browser";
import Input from "../components/input/Input";
import ReCAPTCHA from "react-google-recaptcha";
import emailjs from "emailjs-com";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";
import { AnimationOnScroll } from "react-animation-on-scroll";
import { GraphQLClient, gql } from "graphql-request";
import loadingClasses from "../components/loading/loading.module.css";

const schema = {
  name: Joi.string().required().label("Name"),
  companyName: Joi.string().required().label("Company Name"),
  email: Joi.string().required().email({ allowTld: true }).label("Email"),
  phone: Joi.number().required().label("Phone Number"),
  pickupLocation: Joi.string().required().label("Pick-up Location"),
  pickupLocationState: Joi.string().required().label("Pick-up Location State"),
  deliveryLocation: Joi.string().required().label("Delivery Location"),
  deliveryLocationState: Joi.string()
    .required()
    .label("Delivery Location State"),
  description: Joi.string().min(10).max(300).label("Description"),
  weight: Joi.label("Weight"),
  weightUnits: Joi.label("Units"),
  mode: Joi.string(),
  captcha: Joi.string().required().label("Captcha"),
};
const states = [
  "AL",
  "AK",
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DE",
  "FL",
  "GA",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "OH",
  "OK",
  "OR",
  "PA",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VT",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY",
];
const weight = [
  "grams",
  "kilograms",
  "pounds",
  "ounces",
  "milligrams",
  "micrograms",
  "tonnes",
  "short tons",
  "long tons",
];
const modes = [
  "Dry Van",
  "Flatbed",
  "Refrigerated (Reefer)",
  "Tanker",
  "Intermodal",
  "Step Deck",
  "Lowboy",
  "RGN (Removable Gooseneck)",
  "Dump Truck",
  "Car Carrier",
  "Livestock Carrier",
  "Roll-off Truck",
  "Hazmat",
  "Oversize Load Carrier",
  "Logging Truck",
  "Straight Truck",
  "Doubles and Triples",
  "Auto Hauler",
  "Hotshot Truck",
];

export default function Contact() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [dataForm, setAccount] = useState({
    name: "",
    companyName: "",
    email: "",
    phone: "",
    pickupLocation: "",
    pickupLocationState: "",
    deliveryLocation: "",
    deliveryLocationState: "",
    weight: "",
    weightUnits: "",
    description: "",
    captcha: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const { t } = useTranslation();

  useEffect(() => {
    // scroll.scrollToTop({
    //   smooth: true,
    //   duration: 0,
    // });
    const graphcms = new GraphQLClient(
      "https://api-us-east-1-shared-usea1-02.hygraph.com/v2/cln1nhn7k0cnl01us2gnc06e4/master"
    );
    const QUERY = gql`
      {
        contacts {
          headerContent
          contactInformation
        }
      }
    `;
    async function fetchData() {
      try {
        // scroll.scrollToTop({
        //   smooth: true,
        //   duration: 0,
        // });
        const { contacts } = await graphcms.request(QUERY);

        setData(contacts[0]);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validate();
    setErrors(errors);
    if (errors) return;

    // call server
    emailjs
      .sendForm(
        "service_cva7m9u",
        "template_vhuff74",
        e.target,
        "-Zp7qK6RXAtzXOwL7"
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));

    toast.success(t("contact.toastSubmitted"));
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
  const handleChangeSelect = (name, value, required = true) => {

    if (required) {
      const error = validateProperty(name, value);

      setErrors({
        ...errors,
        [name]: error,
      });
    }

    setAccount({
      ...dataForm,
      [name]: value !== undefined ? value : "",
    });
  };
  const validateProperty = (name, value) => {
    let obj = { [name]: value };
    let subSchema = { [name]: schema[name] };

    let { error } = Joi.validate(obj, subSchema);

    return error ? error.details[0].message : null;
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
      return errors;
    }
    return null;
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

      {isLoading ? (
        <div className={`${loadingClasses.loading} ${classes.header}`} style={{ height: '30vh' }} />
      ) : (
        <div className={classes.header}>
          <h1 className={classes.title}>{data.headerContent[0]}</h1>
          <p className={classes.subTitle}>{data.headerContent[1]}</p>
        </div>
      )}

      {isLoading ? (
        <div className={`${loadingClasses.loading} ${classes.contactWrapper}`} style={{ height: '100vh' }} />
      ) : (
        <AnimationOnScroll animateIn="animate__fadeIn" initiallyVisible={true}>
          <div className={classes.contactWrapper}>
            <div className={classes.content}>
              <h1>Call or email us today!</h1>
              <span>Phone: {data.contactInformation[0]}</span>
              <span>Email: {data.contactInformation[1]}</span>
            </div>
            <form
              id="application-form"
              className={classes.form}
              onSubmit={handleSubmit}
              style={{ opacity: submitted ? 0.5 : 1 }}
            >
              <Input
                name="name"
                value={dataForm.name}
                onChange={handleChange}
                label={"Name"}
                placeholder={"John Doe"}
                error={errors?.name}
                classes={classes}
              />
              <Input
                name="companyName"
                value={dataForm.companyName}
                onChange={handleChange}
                label={"Company Name"}
                placeholder={"ABC Logistics"}
                error={errors?.companyName}
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
                value={dataForm.phone}
                onChange={handleChange}
                label={'Phone'}
                placeholder={"(123) 456-7890"}
                error={errors?.phone}
                classes={classes}
              />
              <Input
                name="pickupLocation"
                value={dataForm?.pickupLocation}
                onChange={handleChange}
                label={"Pick-up Location"}
                placeholder={"City"}
                error={errors?.pickupLocation}
                classes={classes}
              />
              <Input
                name="pickupLocationState"
                value={dataForm?.pickupLocationState}
                label={"State"}
                placeholder={"AK"}
                error={errors?.pickupLocationState}
                classes={classes}
                select={[...states]}
                onChange={handleChangeSelect}
              />
              <Input
                name="deliveryLocation"
                value={dataForm?.deliveryLocation}
                onChange={handleChange}
                label={"Delivery Location"}
                placeholder={"City"}
                error={errors?.deliveryLocation}
                classes={classes}
              />
              <Input
                name="deliveryLocationState"
                value={dataForm?.deliveryLocationState}
                label={"State"}
                placeholder={"AK"}
                error={errors?.deliveryLocationState}
                classes={classes}
                select={[...states]}
                onChange={handleChangeSelect}
              />
              <div className={classes.weight}>
                <Input
                  name="weight"
                  value={dataForm?.weight}
                  label={"Weight"}
                  placeholder={"Example: 100"}
                  error={errors?.weight}
                  required={false}
                  classes={classes}
                  onChange={handleChange}
                />
                <Input
                  name="weightUnits"
                  value={dataForm?.weightUnits}
                  label={"Units"}
                  placeholder={"lbs"}
                  error={errors?.weightUnits}
                  required={false}
                  classes={classes}
                  select={[...weight]}
                  onChange={handleChangeSelect}
                />
              </div>
              <Input
                name="mode"
                value={dataForm?.mode}
                label={"Mode"}
                placeholder={"Equipment Type"}
                error={errors?.mode}
                required={false}
                classes={classes}
                select={[...modes]}
                onChange={handleChangeSelect}
              />
              <div className={[classes.textArea]}>
                <label className={classes.label}>Shipment Details</label>
                <textarea
                  name="description"
                  value={dataForm?.description}
                  id=""
                  cols="30"
                  rows="10"
                  placeholder={"Tell us about your shipment request."}
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
              {submitted || validate() ? (
                <ReCAPTCHA
                  sitekey="6LfBBIEoAAAAAOE6cdrbl5S41kCdK1W41KXxk41k"
                  style={{ gridColumn: "1 / span 2" }}
                  onChange={handleCaptchaComplete}
                />
              ) : (
                <div></div>
              )}
              <button
                className={"btn btn-primary btn-sm"}
                type="submit"
                disabled={submitted || validate()}
              >
                {'Submit'}
              </button>
            </form>
          </div>
        </AnimationOnScroll>
      )}
    </div>
  );
}
