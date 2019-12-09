import React from "react";
import { Link } from "react-router-dom";
import './navigation.css'


const Navigation = props => {
  const {  authUser,logout } = props;
  return (
    <div className='navigation-wrapper'>
      <div className="logo">Transfer</div>
      <div className='item-1'>{authUser ? authUser.username : <Link to="/register">Register</Link>}</div>
      <div className='item-2'>{authUser ? <button onClick={logout} >Logout</button>  : <Link to="/login">Login</Link>}</div>
    </div>
  );
};

export default Navigation;
