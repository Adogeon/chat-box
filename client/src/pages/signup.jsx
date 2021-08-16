import React from "react";

import style from "../styles/SignInPages/style.module.css";

import SignUpForm from "../components/SignUpPage/SignUpForm";

const SignUpPage = () => {
  return (
    <main className={style.mainContainer}>
      <div className={style.formContainer}>
        <h1>Sign Up</h1>
        <SignUpForm />
      </div>
    </main>
  );
};

export default SignUpPage;
