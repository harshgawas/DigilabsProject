import React, { useState, useEffect } from "react";
import styles from "../Styles/home.module.css";
import Notice from "../Components/notice";

import {
  getAllNotice,
  getAllGallery,
  createContact,
} from "../Helper/homeApiCalls";
const Home = () => {
  const [notice, setNotice] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    query: "",
  });

  const handleChange = (name) => (e) => {
    e.preventDefault();
    setValues({ ...values, [name]: e.target.value });
  };
  const [success, setSuccess] = useState(false);

  function onSubmit() {
    const sendData = {
      name: values.name,
      email: values.email,
      phone: values.phone,
      query: values.query,
    };
    console.log(sendData, "hey data shit");
    createContact(sendData).then((data) => {
      console.log(data, "hey data here");
      if (data.error) {
        console.log(data.error);
      } else {
        setSuccess(true);
        window.location.reload(false);
      }
    });
  }

  function fetchNotice() {
    getAllNotice().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setNotice(data);
      }
    });
  }
  function fetchGallery() {
    getAllGallery().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setGallery(data);
      }
    });
  }

  useEffect(() => {
    fetchNotice();
    fetchGallery();
  }, []);

  console.log(gallery, "notice");
  return (
    <div className={styles.home}>
      <div className={styles.hello}>
        <div className={styles.helloin}>
          <span>Hello Pips</span>
        </div>
      </div>

      <div className={styles.notices}>
        <div className={styles.headnote}>
          <span>NOTICES</span>
        </div>
        <div className={styles.individualnote}>
          <div>
            {notice.map((not, index) => {
              return (
                <div>
                  <Notice not={not} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className={styles.gallery}>
        <div className={styles.galleryhead}>
          <span>Gallery</span>
        </div>
        <div className={styles.photos}>
          {gallery.map((gap, index) => {
            return (
              <div>
                <img src={gap.imagelink} alt="*" />
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.contact}>
        <div className={styles.conhead}>
          <span>Contact Us</span>
        </div>
        <div className={styles.form}>
          <div className={styles.some}>
            <div className={styles.form1}>
              <input
                placeholder="Name"
                onChange={handleChange("name")}
                value={values.name}
              />
            </div>
          </div>
          <div className={styles.some}>
            <div className={styles.form1}>
              <input
                placeholder="Email"
                onChange={handleChange("email")}
                value={values.email}
              />
            </div>
          </div>
          <div className={styles.some}>
            <div className={styles.form1}>
              <input
                placeholder="Number"
                onChange={handleChange("phone")}
                value={values.phone}
              />
            </div>
          </div>
          <div className={styles.some}>
            <div className={styles.form1}>
              <input
                placeholder="query"
                onChange={handleChange("query")}
                value={values.query}
              />
            </div>
          </div>
          <div className={styles.some}>
            <button onClick={onSubmit}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
