import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuthState } from "../contexts/authContext";

import style from "../styles/AuthPages/style.module.css";

import SignUpForm from "../components/SignUpPage/SignUpForm";

const SignUpPage = () => {
  const authState = useAuthState();
  const history = useHistory();

  useEffect(() => {
    if (authState.isAuth) {
      history.push("/chat");
    }
  }, [authState]);

  return (
    <main className={style.mainContainer}>
      <div className={style.formContainer}>
        <h1>Sign Up</h1>
        {authState.loading ? (
          <> Signing up ... </>
        ) : (
          <>
            <SignUpForm />
            <div>
              Already a member ? Sign in <Link to="/signin">here</Link>
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default SignUpPage;
