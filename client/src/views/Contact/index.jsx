import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import ContactView from "./ContactView/ContactView";
import Layout from "@components/layout";

import { loadCurrent } from "@store/user/user.actions";

const ContactPage = () => {
  const appState = useSelector((state) => state.app);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!appState.userLoaded) {
      dispatch(loadCurrent());
    }
  }, []);

  return <Layout main={<ContactView />} />;
};

export default ContactPage;
