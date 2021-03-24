import {connect} from "react-redux";
import App from "./App";
import {sendNewMessage, setRoomData, setRoomUsers} from "../../redux/data.reducer";

const mapStateToProps = (state) => {
  return {
    isJoined: state.login.isJoined,
    users: state.data.users,
    messages: state.data.messages,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setRoomUsers: users => {
      dispatch(setRoomUsers(users))
    },
    sendNewMessage: message => {
      dispatch(sendNewMessage(message))
    },
    setRoomData: ({users, messages}) => {
      dispatch(setRoomData({users, messages}))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)