import React from "react";
import { useSelector } from "react-redux";

const ContactList = () => {
  const userState = useSelector((state) => state.user);

  return (
    <div>
      {userState.contact.map((user) => (
        <div>{user.username}</div>
      ))}
    </div>
  );
};

export default ContactList;
