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
import { ContactList } from "../components/UserPage";

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
          <div>
            <h1>Welcome back, {userState.username}</h1>
          </div>
          <div>
            <h2>Contact</h2>
            <ContactList users={userState.contact} />
          </div>
        </Layout>
      )}
    </>
  );
};

export default HomePage;
