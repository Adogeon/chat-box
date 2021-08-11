import React from "react";
import SignInForm from "../components/SignInPage/SignInForm";

const SignInPage = () => {
  return (
    <main className="signInMain">
      <div className="box">
        <h1>Sign In</h1>
        <SignInForm />
      </div>
    </main>
  );
};

export default SignInPage;
