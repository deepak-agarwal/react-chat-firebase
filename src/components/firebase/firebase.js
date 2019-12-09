import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID
}

class Firebase {
  constructor() {
    app.initializeApp(config)
    this.auth = app.auth()
    this.firestore = app.firestore()
  }

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password)

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password)

  doSignOut = () => this.auth.signOut()

  doHandleSession = () => this.auth.onAuthStateChanged()

  getAllUsers = () => {
    console.log('ran read all ', new Date())
    return this.firestore.collection('users').get()
  }

  findAuthUserDetail = email => {
    return this.firestore
      .collection('users')
      .where('email', '==', email)
      .get()
  }

  createUsers = data =>
    this.firestore.collection('users').add({
      username: data.username,
      email: data.email
    })

  createChatRoom = data => {
    const id = `${data.requestCreatorId}${data.requestRecieverId}`
    const roomId = id
      .split('')
      .sort()
      .join('')
    return this.firestore
      .collection('chat-room')
      .doc(roomId)
      .set({
        ...data
      })
  }

  getChatForLoggedInUser = userId => {
    return this.firestore
      .collection('chat-room')
      .where('requestCreatorId', '==', userId)
      .get()
  }

  getChatForOtherUser = userId => {
    return this.firestore
      .collection('chat-room')
      .where('requestRecieverId', '==', userId)
      .get()
  }

  getMessages = roomId => {
    return this.firestore.collection('message').where('roomId', '==', roomId)
  }

  createMessage = (message, roomId, senderId, recieverId) =>
    this.firestore
      .collection('message')
      .add({ roomId, message, senderId, recieverId, timeStamp: new Date() })
}
export default Firebase
