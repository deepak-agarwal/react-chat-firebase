// /list of users in the databsae
// use ul anf li to show all ths user
// onClick opens the chat if exixts or else creta a new room.

import React from "react";



export const Users = (props) => {
  const {users,createChat}= props
  return (
    <div>
      <h2>Users</h2>
      <hr/>
      {users?users.map(e => (
        <button key={e.id} onClick={() => createChat(e)}>{e.username}</button>
      )):null}
    </div>
  );
};
