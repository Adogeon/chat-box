import React from "react";
import { useHistory } from "react-router";
import {useBoxState} from "./"

const UserCard = (props) => {
  const history = useHistory();
  const handleClick = () => {
       
    history.push(`/chat/${roomId}`)
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
