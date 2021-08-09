import React, { useState, useEffect } from "react";
import { login, signup } from './services'
import "./style.scss";

const Home = (props) => {
  const [authMethod, setAuthMethod] = useState()
  const [username, setUsername] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()


  const handleUsername = e => setUsername(e.target.value)
  const handlePassword = e => setPassword(e.target.value)
  const handleEmail = e => setEmail(e.target.value)

  const loginWrapper = (e) => {
    e.preventDefault()
    login({ username, password })
  }

  const signupWrapper = (e) => {
    e.preventDefault()
    signup({ username, email, password })
  }

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

              <button
                className="auth-form-submit"
              >Login
              </button>

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
                onChange={handlePassword}
              />
              <input
                type="password"
                placeholder="password"
                className="auth-form-input"
                onChange={handleEmail}
                required={true}
              />

              <button
                className="auth-form-submit"
              >
                Signup
              </button>

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
