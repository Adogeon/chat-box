import React from "react";
import { useHistory } from "react-router";

const UserCard = (props) => {
  console.log(props.user);

  const handleClick = () => {
    console.log(props.user.username);
  };

  return (
    <a role="button" onClick={handleClick}>
      <div>
        <div>
          <img />
        </div>
        <div>
          <div>{props.user.username}</div>
          <div>Last online</div>
        </div>
      </div>
    </a>
  );
};

export default UserCard;
