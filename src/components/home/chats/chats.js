//list of chat for that specific user . data will come as an array of object.  <- data
//heading and ist of chats <- visual
//onClck will pass sub document as a props to the messagae box

import "./chats.css";
import React from "react";

const Chats = props => {
  return (
    <div>
      <h2>Chats</h2>

      {/* active */}
      <h3>Active</h3>
      {props.chats
        ? props.chats.map(e =>
            e.active ? (
              <button key={e.id} onClick={() => props.startMessage(e.id,e.requestRecieverId,e.requestCreatorId)}>
                {e.name} {e.requestCreatorId} {e.requestRecieverId}
              </button>
            ) : null
          )
        : null}

      {/* Request */}
      <h3>Request</h3>
      {props.chats
        ? props.chats.map(e =>
            !e.active && props.authUser.id === e.requestRecieverId ? (
              <button key={e.id} onClick={() => props.startMessage(e.id,e.requestRecieverId)}>
                {e.name} {e.requestCreatorId} {e.requestRecieverId}
              </button>
            ) : null
          )
        : null}

      {/* Pending */}
      <h3>Pending</h3>
      {props.chats
        ? props.chats.map(e =>
            !e.active && props.authUser.id !== e.requestRecieverId? (
              <button key={e.id} onClick={() => props.startMessage(e.id,e.requestRecieverId)}>
                {e.name} {e.requestCreatorId} {e.requestRecieverId}
              </button>
            ) : null
          )
        : null}
    </div>
  );
};

export default Chats;
