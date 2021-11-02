import React from "react";
import { MenuList, MenuItem } from "../../../components/menu";

const ContactList = (props) => {
  //fetch user contact state

  //data types of contacts
  // [contact]

  //data type of contact
  // - id: contact userId
  // - username: contact username
  // - avartar: contact avartar
  // - status: contact online status (online | busy | offline)

  const handleItemClick = (id) => {
    //do something with contact id
    console.log(id);
  };

  return (
    <MenuList>
      {props.contacts.map((contact) => {
        return (
          <MenuItem
            type={"one-line"}
            icon={contact.avartar}
            text={contact.username}
            extra={contact.status}
            onClick={() => handleItemClick(contact.id)}
          />
        );
      })}
    </MenuList>
  );
};

export default ContactList;
