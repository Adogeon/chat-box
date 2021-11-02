import React, { useState } from "react";
import { useSelector } from "react-redux";

import ContactList from "../ContactList/ContactList";
import Layout from "../../../components/layout/Layout";

import style from "./ContactPage.module.css";

const ContactView = (props) => {
  const [tab, setTab] = useState("friends");

  const constactState = useSelector((state) => state.user.contact);

  return (
    <div className={style.main}>
      <ul className={style.menu}>
        <li>
          <button>Online</button>
        </li>
        <li>
          <button>All</button>
        </li>
        <li>
          <button>Pending</button>
        </li>
        <li>
          <button>Blocked</button>
        </li>
        <li>
          <button>Add friend</button>
        </li>
      </ul>
      <ContactList contacts={data} />
    </div>
  );
};

const ContactPage = () => {
  return <Layout main={<ContactView />} />;
};

export default ContactPage;
