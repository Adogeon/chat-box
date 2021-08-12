import React from "react";

//style import;
import style from "../styles/SignInPages/style.module.css";

//component import
import SignInForm from "../components/SignInPage/SignInForm";

const SignInPage = () => {
  return (
    <main className={style.mainContainer}>
      <div className={style.formContainer}>
        <h1>Sign In</h1>
        <SignInForm />
      </div>
    </main>
  );
};

export default SignInPage;
