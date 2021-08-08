import React, { useState, useEffect } from "react";
import "./style.scss";

const Home = (props) => {
  const [authMethod, setAuthMethod] = useState();

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
            <form id="auth-form">
              <input
                type="text"
                placeholder="username"
                className="auth-form-input"
                required={true}
              />
              <input
                type="password"
                placeholder="password"
                className="auth-form-input"
                required={true}
              />

              <button className="auth-form-submit">Login</button>

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
            <form id="auth-form">
              <input
                type="text"
                placeholder="username"
                className="auth-form-input"
                required={true}
              />
              <input
                type="email"
                placeholder="email"
                className="auth-form-input"
                required={true}
              />
              <input
                type="password"
                placeholder="password"
                className="auth-form-input"
                required={true}
              />

              <button className="auth-form-submit">Login</button>

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
