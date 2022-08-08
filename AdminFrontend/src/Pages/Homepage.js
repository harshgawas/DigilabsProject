import React, { useState } from "react";

import { Signin } from "../Helper/helper";
import styles from "../styles/homepage.module.css";

const Homepage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  function onClick() {
    setError("");
    const user = {
      email: email,
      password: password,
    };
    Signin(user).then((data) => {
      if (data.status === "succes") {
        localStorage.setItem("user", JSON.stringify(data.add._id));
        window.location.reload(false);
      } else {
        setError(data.message);
      }
    });
  }

  return (
    <>
      <div>
        <p>Login using your credentials</p>
        <div className={styles.signin}>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Enter email"
          />
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Enter password"
          />
          <button onClick={() => onClick()}>Signin</button>
          {error && <p>{error}</p>}
        </div>
      </div>
    </>
  );
};

export default Homepage;
