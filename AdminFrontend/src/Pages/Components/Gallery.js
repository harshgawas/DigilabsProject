import React, { useState, useEffect } from "react";
import styles from "../../styles/adminpage.module.css";
import {
  uploadGalleryImages,
  getGalleryById,
  getAllGallery,
  deleteGallery,
  updateGalleryImages,
} from "../../Helper/adminapiCalls";
const Gallery = () => {
  const [newnoticeblock, setnewnoticeblock] = useState(false);
  const [newnoticeblock2, setnewnoticeblock2] = useState(false);

  const [images, setImages] = useState({
    imagelink: "",
  });
  const [gallerys, setGalleries] = useState([]);
  const [busy, setBusy] = useState(true);

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
      ? JSON.parse(localStorage.getItem("user"))
      : undefined
  );

  useEffect(() => {
    getGalleryById(user).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setGalleries(data);
        setBusy(false);
      }
    });
  }, []);

  const handleProfileImage = (name) => (e) => {
    setImages({ ...images, [name]: e.target.files });
  };

  function onSubmit() {
    console.log("hey dude hello");
    let formData = new FormData();

    formData.append("imagelink", images.imagelink[0]);
    formData.append("admin", user);
    uploadGalleryImages(formData).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        window.location.reload(false);
      }
    });
  }

  function onDelete(id) {
    deleteGallery(id).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        window.location.reload(false);
      }
    });
  }
  const [save, setSave] = useState("");

  console.log(save, "hey");
  function onSubmit2() {
    let formData = new FormData();

    formData.append("imagelink", images.imagelink[0]);

    updateGalleryImages(formData, save).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        window.location.reload(false);
      }
    });
  }

  const newNotice = () => {
    return (
      <div className={styles.newnotice}>
        <p>New Image</p>
        <div className={styles.newnoticein}>
          <input
            onChange={handleProfileImage("imagelink")}
            type="file"
            id="profileimage"
            accept="image/*"
          ></input>
          <div>
            <button onClick={onSubmit}>Upload</button>
            <button onClick={() => setnewnoticeblock(false)}>Close</button>
          </div>
        </div>
      </div>
    );
  };

  const updateNotice = () => {
    return (
      <div className={styles.newnotice}>
        <p>Change Image</p>
        <div className={styles.newnoticein}>
          <input
            onChange={handleProfileImage("imagelink")}
            type="file"
            id="profileimage"
            accept="image/*"
          ></input>
          <div>
            <button onClick={onSubmit2}>Update</button>
            <button onClick={() => setnewnoticeblock2(false)}>Close</button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {busy ? (
        <div>Loading...</div>
      ) : (
        <div className={styles.notice}>
          <p>Gallery</p>
          <span onClick={() => setnewnoticeblock(true)}>Upload new Image</span>
          <p>Uploaded Images</p>
          <div className={styles.imagegrid}>
            {gallerys.map((gallery, index) => {
              return (
                <div className={styles.gridmembers} key={index}>
                  <img src={gallery.imagelink} alt="hello" />
                  <div>
                    <button onClick={() => onDelete(gallery._id)}>
                      Delete
                    </button>
                    <button
                      onClick={() => {
                        setnewnoticeblock(true);
                        setSave(gallery._id);
                      }}
                    >
                      Update
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          {newnoticeblock === true ? newNotice() : ""}
          {newnoticeblock2 === true ? updateNotice() : ""}
        </div>
      )}
    </div>
  );
};

export default Gallery;
