import React, { useState, useEffect } from "react";
import { authUser, login, signup } from "./services";
import "./style.scss";

const Home = (props) => {
  const [authMethod, setAuthMethod] = useState();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [errorData, setErrorData] = useState();

  const handleUsername = (e) => setUsername(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleConfirmPassword = (e) => setConfirmPassword(e.target.value);

  authUser(props);

  const loginWrapper = (e) => {
    e.preventDefault();
    login({ username, password }, props).catch((error) => {

      setErrorData(error.message);
    });
  };

  const signupWrapper = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setErrorData("password didnt match");
    }
    signup({ username, email, password }, props).catch((error) => {
      setErrorData(error.message);
    });
  };

  useEffect(() => {
    let param = new URLSearchParams(window.location.search);
    param = param.get("m");
    setAuthMethod(param);
  }, []);

  return (
    <div className="home-page">
      <div className="wrapper">
        <div className="texts">
          <h1>Pesan Reliabel.</h1>
          <h1>Sederhana. Aman.</h1>
        </div>

        <div className="auth-container">
          {/* If No query parameter */}
          {authMethod === null && (
            <form id="auth-form" onSubmit={loginWrapper}>
              <input
                type="text"
                placeholder="username"
                className="auth-form-input"
                required={true}
                onChange={handleUsername}
              />
              <input
                type="password"
                placeholder="password"
                className="auth-form-input"
                required={true}
                onChange={handlePassword}
              />

              <button className="auth-form-submit">Login</button>

              {!!errorData && <p style={{ color: "red" }}>{errorData}</p>}
              <p>
                Belum memiliki akun?{" "}
                <a href="?m=signup" className="switch-control">
                  Daftar
                </a>
              </p>
            </form>
          )}

          {/* If query parameter is signup */}
          {authMethod === "signup" && (
            <form id="auth-form" onSubmit={signupWrapper}>
              <input
                type="text"
                placeholder="username"
                className="auth-form-input"
                required={true}
                onChange={handleUsername}
              />
              <input
                type="email"
                placeholder="email"
                className="auth-form-input"
                required={true}
                onChange={handleEmail}
              />
              <input
                type="password"
                placeholder="password"
                className="auth-form-input"
                onChange={handlePassword}
                required={true}
              />
              <input
                type="password"
                placeholder="confirm password"
                className="auth-form-input"
                onChange={handleConfirmPassword}
                required={true}
              />

              <button className="auth-form-submit">Signup</button>

              {!!errorData && <p style={{ color: "red" }}>{errorData}</p>}

              <p>
                Sudah memiliki akun?{" "}
                <a href="/" className="switch-control">
                  Login
                </a>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
