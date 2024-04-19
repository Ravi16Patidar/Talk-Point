import React from "react";
import "./Message.css";
const Message = ({ user, message, classs }) => {
  if (user) {
    return (
      <div className={`messageBox ${classs}`}>
        {`${user.charAt(0).toUpperCase() + user.slice(1)}: ${message}`}
      </div>
    );
    }
else{
      return <div className={`messageBox ${classs}`}>{`You:${message}`}</div>;
  }
};

export default Message;
