import React, { useState } from "react";
import "./auth.css";
import AppContext from "../../context";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <AppContext.Consumer>
      {({ token, user, setToken, setUser }) => {
        const changeEmail = e => {
          setEmail(e.target.value);
        };

        const changePassword = e => {
          setPassword(e.target.value);
        };

        const login = async () => {
          const query = {
            query: `
              query {
                login(authInput: {
                  email: "${email}",
                  password: "${password}",
                }) {
                  token,
                  user,
                }
              }
            `
          };

          try {
            let response = await fetch("http://localhost:3000/graphql/", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(query)
            });
            const {
              data: {
                login: { token, user }
              }
            } = await response.json();
            setToken(token);
            setUser(user);
          } catch (error) {
            console.log(error);
          }
        };

        return (
          <form className="auth__main-form">
            <div className="auth__main-form-input-section">
              <label htmlFor="email">Email</label>
              <input id="email" type="email" onChange={changeEmail} />
            </div>
            <div className="auth__main-form-input-section">
              <label htmlFor="password">Password</label>
              <input id="password" type="password" onChange={changePassword} />
            </div>
            <div className="auth__main-form-button-section">
              <button className="login-signup" type="button" onClick={login}>
                Login
              </button>
              <div className="or-seperation">or</div>
              <button type="button" onClick={login}>
                Switch to SignUp
              </button>
            </div>
          </form>
        );
      }}
    </AppContext.Consumer>
  );
};

export default Auth;
