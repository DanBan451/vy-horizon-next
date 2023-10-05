"use client";
import React, { useEffect, useState } from "react";
import classes from "./quotemodal.module.css";
import Joi from "joi-browser";
import Input from "../components/input/Input";

import Loader from "../components/loader/Loader";
import loadingClasses from "../components/loading/loading.module.css";

import { GraphQLClient, gql } from "graphql-request";

const schema = {
  name: Joi.string().required().label("Name"),
  companyName: Joi.string().required().label("Company Name"),
  email: Joi.string().required().email({ allowTld: true }).label("Email"),
  phone: Joi.number().required().label("Phone Number"),
  description: Joi.string().min(10).max(300).label("Description"),
};

const QuoteModal = ({ isOpen, onClose }) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [dataForm, setAccount] = useState({
    name: "",
    companyName: "",
    email: "",
    phone: "",
    description: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const graphcms = new GraphQLClient(
      "https://api-us-east-1-shared-usea1-02.hygraph.com/v2/cln1nhn7k0cnl01us2gnc06e4/master"
    );
    const QUERY = gql`
      {
        homes {
          quoteImage {
            url
          }
        }
      }
    `;

    async function fetchData() {
      try {
        const { homes } = await graphcms.request(QUERY);

        setData(homes[0]);
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
    //     "service_cva7m9u",
    //     "template_vhuff74",
    //     e.target,
    //     "-Zp7qK6RXAtzXOwL7"
    //   )
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => console.log(err));

    onClose(true);

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
      console.log(errors);
      return errors;
    }
    return null;
  };

  return (
    <div>
      <div className={`${classes.modal} ${isOpen ? `${classes.open}` : ""}`}>
        {isLoading ? (
          <div
            className={`${loadingClasses.loading} ${classes.image}`}
          />
        ) : (
          <Loader
            src={data.quoteImage[3].url}
            small={data.quoteImage[0].url}
            medium={data.quoteImage[1].url}
            large={data.quoteImage[2].url}
            classNameProp={classes.image}
          />
        )}

        <h1>Contact Us Today!</h1>
        <div className={classes["modal-content"]}>
          <span className={classes.close} onClick={() => onClose(false)}>
            &times;
          </span>
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
              value={dataForm?.phone}
              onChange={handleChange}
              label={"Phone Number"}
              placeholder={"(123) 456-7890"}
              error={errors?.phone}
              classes={classes}
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
                <div className={`alert alert-danger m-0 mb-3 ${classes.error}`}>
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
      </div>
    </div>
  );
};

export default QuoteModal;
