import React from "react";
import ContactView from "./ContactView/ContactView";
import Layout from "@components/layout/Layout";

const ContactPage = () => {
  return <Layout main={<ContactView />} />;
};

export default ContactPage;
