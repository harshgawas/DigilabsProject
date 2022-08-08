import React from "react";
import styles from "../Styles/home.module.css";
const Notice = ({ not }) => {
  return (
    <div className={styles.note}>
      <div className={styles.notesummary}>
        <div className={styles.name}>
          <span>hello its {not.admin.name}</span>
        </div>
        <div className={styles.string}>
          <span>{not.notice}</span>
        </div>
      </div>
      <div className={styles.time}>
        <span>{not.createdAt.substring(0, 10)}</span>
      </div>
    </div>
  );
};

export default Notice;
