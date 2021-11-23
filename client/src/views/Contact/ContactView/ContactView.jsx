import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";

import { contactSelector } from "@store/user/user.slices";

import { Box, Tabs, Tab, Typography, Card } from "@mui/material";

import ContactList from "../ContactList/ContactList";
import AddContact from "../AddContact/AddContact";
import PendingList from "../PendingList/PendingList";
import style from "./ContactPage.module.css";

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

const selectAllContacts = (state) => contactSelector.selectAll(state.contacts);
const selectOnlineContact = createSelector(selectAllContacts, (contacts) =>
  contacts.filter((contact) => contact.status !== "offline")
);

const ContactView = (props) => {
  const [tab, setTab] = useState("friends");
  const [contactList, setContactList] = useState([]);
  const userState = useSelector((state) => state.user);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    switch (newValue) {
      case 0:
        setContactList(selectOnlineContact(userState));
        break;
      case 1:
        setContactList(selectAllContacts(userState));
      default:
        break;
    }
    setValue(newValue);
  };

  return (
    <Card elevation={4} sx={{ width: "100%", height: "80vh" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs onChange={handleChange} value={value}>
          <Tab label="Online" />
          <Tab label="All" />
          <Tab label="Pending" />
          <Tab label="New Contact" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <ContactList contacts={contactList} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ContactList contacts={contactList} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <PendingList />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <AddContact />
      </TabPanel>
    </Card>
  );
};

export default ContactView;
