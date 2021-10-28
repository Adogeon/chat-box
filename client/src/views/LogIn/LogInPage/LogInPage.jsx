import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

//style import;
import style from "./LogInPage.module.css";
//component import
import SignInForm from "../SignInForm/SignInForm.jsx";
import SignUpForm from "../SignUpForm/SignUpForm.jsx";

const SignInPage = () => {
  const authState = useSelector((state) => state.auth);
  const [mode, setMode] = useState("signIn");

  return (
    <main className={style.mainContainer}>
      <div className={style.formContainer}>
        <h1>Sign In</h1>
        {authState.loading ? (
          <>Logging you in...</>
        ) : mode === "signIn" ? (
          <>
            <SignInForm />
            <div>
              Not a member ? Sign up{" "}
              <a
                role="button"
                onClick={() => {
                  setMode("signUp");
                }}
              >
                here
              </a>
            </div>
          </>
        ) : (
          <>
            <SignUpForm />
            <div>
              Already a member ? Sign in
              <a
                role="button"
                onClick={() => {
                  setMode("signIn");
                }}
              >
                here
              </a>
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default SignInPage;
