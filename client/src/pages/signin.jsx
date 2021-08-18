import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuthState } from "../contexts/authContext";

//style import;
import style from "../styles/AuthPages/style.module.css";
//component import
import SignInForm from "../components/SignInPage/SignInForm";

const SignInPage = () => {
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
        <h1>Sign In</h1>
        {authState.loading ? (
          <>Logging you in...</>
        ) : (
          <>
            <SignInForm />
            <div>
              Not a member ? Sign up <Link to="/signup">here</Link>
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default SignInPage;
