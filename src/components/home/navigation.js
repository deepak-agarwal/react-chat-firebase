import React from "react";
import { Link } from "react-router-dom";

const Navigation = props => {
  const { isUser, user } = props;
  return (
    <div>
      <div className="logo">Transfer</div>
      <div>{isUser ? user.username : <Link to="/register">Register</Link>}</div>
      <div>{isUser ? Logout : <Link to="/login">Login</Link>}</div>
    </div>
  );
};

export default Navigation;
