import React from "react";
import UserCard from "../UserCard/UserCard";

const ContactList = (props) => {
  console.log(props.users);
  return (
    <div>
      {props.users.map((user) => {
        return <UserCard user={user} />;
      })}
    </div>
  );
};

export default ContactList;
