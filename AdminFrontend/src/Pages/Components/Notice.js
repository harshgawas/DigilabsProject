import React, { useEffect, useState } from "react";
import {
  createNotice,
  getNotices,
  deleteNotice,
  updateNotice,
} from "../../Helper/helper";
import styles from "../../styles/adminpage.module.css";

const Notice = () => {
  const [first, setfirst] = useState([]);
  const [newnoticeblock, setnewnoticeblock] = useState(false);
  const [notice2, setNotice] = useState("");
  const [updatedNotice, setUpdatedNotice] = useState();
  const [newnoticevalue, setNewnoticevalue] = useState("");
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
      ? JSON.parse(localStorage.getItem("user"))
      : undefined
  );
  useEffect(() => {
    getNotices(user).then((data) => {
      console.log(data);
      setfirst(data);
    });
  }, []);

  function uploadNewNotice() {
    const notice = {
      admin: user,
      notice: notice2,
    };
    createNotice(notice).then((data) => {
      if (data.status === "success") {
        window.location.reload(false);
      }
    });
  }

  function onClickUpdate() {
    const notice = {
      noticeId: updatedNotice._id,
      notice: newnoticevalue,
    };
    updateNotice(notice).then((data) => {
      if (data.status === "succes") {
        window.location.reload(false);
      }
    });
  }

  const newNotice = () => {
    return (
      <div className={styles.newnotice}>
        <p>New Notice</p>
        <div className={styles.newnoticein}>
          <input
            onChange={(e) => setNotice(e.target.value)}
            value={notice2}
            placeholder="New Notice"
          />
          <div>
            <button onClick={() => uploadNewNotice()}>Upload</button>
            <button onClick={() => setnewnoticeblock(false)}>Close</button>
          </div>
        </div>
      </div>
    );
  };

  const updateNoticescreen = () => {
    return (
      <div className={styles.newnotice}>
        <p>New Notice</p>
        <div className={styles.newnoticein}>
          <input
            onChange={(e) => setNewnoticevalue(e.target.value)}
            value={newnoticevalue}
            placeholder="New Notice"
          />
          <div>
            <button onClick={() => onClickUpdate()}>Update</button>
            <button onClick={() => setNewnoticevalue("")}>Cancel</button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.notice}>
      <p>Notices</p>
      <span onClick={() => setnewnoticeblock(true)}>Upload new Notice</span>
      <p>Uploaded Notices</p>
      {first ? (
        <div className={styles.notices}>
          {first.map((note, index) => {
            return (
              <div className={styles.note} key={index}>
                <span>{note.notice}</span>
                <div>
                  <button
                    onClick={() =>
                      deleteNotice(note._id).then((data) => {
                        if (data.status === "succes") {
                          window.location.reload(false);
                        }
                      })
                    }
                  >
                    Delete
                  </button>
                  <button
                    onClick={async () => {
                      await setUpdatedNotice(note);
                      setNewnoticevalue(note.notice);
                    }}
                  >
                    Update
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <>No Notice found</>
      )}
      {newnoticeblock === true ? newNotice() : ""}
      {newnoticevalue !== "" ? updateNoticescreen() : ""}
    </div>
  );
};

export default Notice;
