import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";

import { contactSelector } from "../../../store/user/user.slices";

import ContactList from "../ContactList/ContactList";
import Layout from "../../../components/layout/Layout";

import style from "./ContactPage.module.css";

const selectAllContacts = (state) => contactSelector.selectAll(state.contacts);
const selectOnlineContact = createSelector(selectAllContacts, (contacts) =>
  contacts.filter((contact) => contact.status !== "offline")
);

const ContactView = (props) => {
  const [tab, setTab] = useState("friends");
  const [contactList, setContactList] = useState([]);
  const userState = useSelector((state) => state.user);

  useEffect(() => {
    switch (tab) {
      case "all":
        setContactList(selectAllContacts(userState));
        break;
      case "online":
        selectOnlineContact(selectOnlineContact(userState));
        break;
      case "pending":
        //action for show pending contact;
        break;
      default:
        break;
    }
  }, [tab]);

  return (
    <div className={style.main}>
      <ul className={style.menu}>
        <li>
          <button onClick={() => setTab("online")} className={style.tab}>
            Online
          </button>
        </li>
        <li>
          <button onClick={() => setTab("all")} className={style.tab}>
            All
          </button>
        </li>
        <li>
          <button onClick={() => setTab("pending")} className={style.tab}>
            Pending
          </button>
        </li>
        <li>
          <button onClick={() => setTab("blocked")} className={style.tab}>
            Blocked
          </button>
        </li>
        <li>
          <button onClick={() => handleAddFriend()} className={style.tab}>
            Add friend
          </button>
        </li>
      </ul>
      <ContactList contacts={contactList} />
    </div>
  );
};

const ContactPage = () => {
  return <Layout main={<ContactView />} />;
};

export default ContactPage;
