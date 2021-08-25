import React, { useEffect } from "react";

//import context
import { useAuthState } from "../contexts/authContext";
import {
  useUserState,
  loadCurrentUser,
  useUserDispatch,
} from "../contexts/userContext";

//import components
import Layout from "../components/common/Layout";

const HomePage = () => {
  const userState = useUserState();
  const userDispatch = useUserDispatch();
  const authState = useAuthState();

  useEffect(() => {
    loadCurrentUser(authState.token, userDispatch);
  }, []);

  return (
    <>
      {userState.loading ? (
        <div> LoAdInG UsEr ...</div>
      ) : (
        <Layout>
          <div>Welcome back, {userState.username}</div>
        </Layout>
      )}
    </>
  );
};

export default HomePage;
