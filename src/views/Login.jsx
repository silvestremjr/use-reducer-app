import React, { useState, useReducer } from "react";
import { login } from "../utils/login";

function loginReducer(state, action) {
  switch (action.type) {
    case "field":
      return {
        ...state,
        [action.field]: action.value,
      };
    case "login":
      return {
        ...state,
        isLoading: true,
        error: "",
      };
    case "error":
      return {
        ...state,
        error: "Error: incorrect username or password",
        isLoading: false,
        username: "",
        password: "",
      };
    case "success":
      return {
        ...state,
        isLoggedIn: true,
      };
    case "logout":
      return {
        ...state,
        isLoading: false,
        isLoggedIn: false,
        error: "",
        username: "",
        password: "",
      };
    case "logged":
      return {
        ...state,
        isLoggedIn: true,
        error: "",
      };
    default:
      return state;
  }
  return state;
}

const initialState = {
  username: "",
  password: "",
  isLoading: false,
  isLoggedIn: false,
  error: "",
};

export default function Login() {
  const [state, dispatch] = useReducer(loginReducer, initialState);

  const { username, password, isLoading, isLoggedIn, error } = state;

  const onSubmit = async (e) => {
    e.preventDefault();

    dispatch({ type: "login" });

    await login({ username, password })
      .then(() => {
        dispatch({ type: "success" });
      })
      .catch(() => {
        dispatch({ type: "error" });
      });
  };
  return (
    <div className="App">
      <div className="login-container">
        {isLoggedIn ? (
          <>
            <h1>Logged in</h1>
            <button onClick={() => dispatch({ type: "logout" })}>
              Log Out
            </button>
          </>
        ) : (
          <form onSubmit={onSubmit} className="form">
            {error && <p>{error}</p>}
            <p>Please Login</p>
            <input
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) =>
                dispatch({
                  type: "field",
                  field: "username",
                  value: e.currentTarget.value,
                })
              }
            />
            <input
              type="password"
              placeholder="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) =>
                dispatch({
                  type: "field",
                  field: "password",
                  value: e.currentTarget.value,
                })
              }
            />
            <button className="submit" type="submit">
              {isLoading ? "Logging in..." : "Log In"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
