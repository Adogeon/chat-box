import React from "react";

const SignInPage = () => {
  return (
    <main class="signInMain">
      <div class="box">
        <h1>Sign In</h1>
        <div>
          <label for="username">Username</label>
          <input name="username" type="text" />
        </div>
        <div>
          <label for="password">Password</label>
          <input name="password" type="password" />
        </div>
      </div>
    </main>
  );
};

export default SignInPage;
