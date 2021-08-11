import React from "react";

const SignUpPage = () => {
  return (
    <main class="signUpMain">
      <div class="box">
        <h1>Sign Up</h1>
        <div>
          <label for="username">Username</label>
          <input name="username" type="text" />
        </div>
        <div>
          <label for="email">Email</label>
          <input name="email" type="text" />
        </div>
        <div>
          <label for="password">Password</label>
          <input name="password" type="password" />
        </div>
        <div>
          <label for="confirmPass">Confirm Password</label>
          <input name="confirmPass" type="password" />
        </div>
      </div>
    </main>
  );
};

export default SignUpPage;
