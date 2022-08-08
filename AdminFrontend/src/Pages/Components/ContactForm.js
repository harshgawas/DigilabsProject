import React, { useEffect, useState } from "react";
import { getAllForms } from "../../Helper/helper";
import styles from "../../styles/adminpage.module.css";

const ContactForm = () => {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    getAllForms().then((data) => {
      setForms(data);
    });
  }, []);

  return (
    <div className={styles.notice}>
      <p>Contact Form</p>
      {forms.map((form, index) => {
        return (
          <div key={index} className={styles.note}>
            <span>Name:{form.name}</span>
            <span>Email:{form.email}</span>
            <span>Phone:{form.phone}</span>
            <span>Query:{form.query}</span>
          </div>
        );
      })}
    </div>
  );
};

export default ContactForm;
