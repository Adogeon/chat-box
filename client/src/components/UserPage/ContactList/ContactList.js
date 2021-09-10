import React from "react";
import UserCard from "../UserCard/UserCard";

const ContactList = (props) => (
  <div>
    {props.user.map((user) => {
      return <UserCard data={user} />;
    })}
  </div>
);

export default ContactList;
