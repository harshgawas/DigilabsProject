import React from "react";
import { useParams } from "react-router-dom";
import styles from "../styles/adminpage.module.css";
import ContactForm from "./Components/ContactForm";
import Gallery from "./Components/Gallery";
import Notice from "./Components/Notice";

const AdminPage = () => {
  const params = useParams();
  const paneltype = params.paneltype;

  return (
    <>
      <div className={styles.adminpage}>
        <span
          className={styles.signoutnow}
          onClick={() => {
            localStorage.removeItem("user");
            window.location.reload(false);
          }}
        >
          Signout
        </span>
        <div className={styles.header}>
          <a href="/panel/notices">Notices</a>
          <a href="/panel/gallery">Gallery</a>
          <a href="/panel/contactforms">Contact forms</a>
        </div>
        <div className={styles.body}>
          {paneltype === "notices" && <Notice />}
          {paneltype === "gallery" && <Gallery />}
          {paneltype === "contactforms" && <ContactForm />}
        </div>
      </div>
    </>
  );
};

export default AdminPage;
