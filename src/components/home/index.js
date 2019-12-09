import React from "react";
import Navigation from "./navigation/navigation";
import ChatWindow from "./chatWindow/chatWindow";
import Chats from "./chats/chats";
import { Users } from "./users/users";
import "./index.css";
import { withFirebase } from "../firebase";
import Login from "../auth/login/login";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authUser: null,
      users: null,
      chats: null,
      roomId: null,
      recieverId: null,
      senderId: null,
      messages: null
    };
    this.messageBox = React.createRef();
  }
  componentDidMount() {
    this.props.firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? this.props.firebase
            .findAuthUserDetail(authUser.email)
            .then(doc => {
              const authUser = { ...doc.docs[0].data(), id: doc.docs[0].id };
              this.setState({ authUser });
            })
            .then(() => {
              this.props.firebase
                .getChatForLoggedInUser(this.state.authUser.id)
                .then(querySnapshot => {
                  const chats = [];
                  querySnapshot.forEach(doc => {
                    chats.push({ ...doc.data(), id: doc.id });
                  });
                  // console.log(chats);
                  // this.setState({ chats });

                  this.props.firebase
                    .getChatForOtherUser(this.state.authUser.id)
                    .then(querySnapshot => {
                      querySnapshot.forEach(doc => {
                        chats.push({ ...doc.data(), id: doc.id });
                      });
                      console.log(chats);
                      this.setState({ chats });
                    });
                })
                .catch(err => console.log(err));
            })
            .catch(err => console.log(err))
        : this.setState({ authUser: null });
    });

    this.props.firebase
      .getAllUsers()
      .then(querySnapshot => {
        const users = [];
        querySnapshot.forEach(doc => {
          users.push({ ...doc.data(), id: doc.id });
        });
        this.setState({ users });
      })
      .catch(er => console.log(er));
  }

  createChat = userClicked => {
    console.log(userClicked, this.state.authUser);
    const data = {
      requestRecieverId: userClicked.id,
      requestCreatorId: this.state.authUser.id,
      name: `${userClicked.username}${this.state.authUser.username}`,
      active: false
    };
    this.props.firebase
      .createChatRoom(data)
      .then(room => {
        console.log(room);
      })
      .catch(err => console.log(err));
  };

  logout = () => {
    this.props.firebase.doSignOut().then(authUser => {
      authUser
        ? this.setState({ authUser })
        : this.setState({ authUser: null });
    });
  };

  startMessage = (roomId, recieverId, senderId) => {
    this.messageBox.current.children[1].children[0].focus();
    this.setState({ roomId, recieverId, senderId });
    this.props.firebase.getMessages(roomId).onSnapshot(query => {
      const messages = query.docs.map(doc => {
        const data = doc.data();
        return { ...data, id: doc.id };
      });
      messages.sort((a, b) => a.timeStamp.seconds - b.timeStamp.seconds)
      
      this.setState({messages})
    });
  };
  render() {
    return (
      <React.Fragment>
        <Navigation authUser={this.state.authUser} logout={this.logout} />

        {!this.state.authUser ? (
          <Login />
        ) : (
          <div className="main-content">
            <div className="chats">
              <Chats
                {...this.props}
                {...this.state}
                startMessage={this.startMessage}
              />
            </div>
            <div className="main-chat">
              <ChatWindow
                messageBox={this.messageBox}
                roomId={this.state.roomId}
                authUser={this.state.authUser}
                recieverId={this.state.recieverId}
                senderId={this.state.senderId}
                messages={this.state.messages}
              />
            </div>
            <div className="users">
              <Users users={this.state.users} createChat={this.createChat} />
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default withFirebase(Home);
