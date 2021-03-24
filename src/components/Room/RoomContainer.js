import {connect} from "react-redux";
import Room from "./Room";
import {sendNewMessage, setNewMessageText, setRoomData} from "../../redux/data.reducer";

const mapStateToProps = (state) => {
  return {
    roomId: state.login.roomId,
    userName: state.login.userName,
    users: state.data.users,
    messages: state.data.messages,
    newMessageText: state.data.newMessageText,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setRoomData: roomData => {
      dispatch(setRoomData(roomData))
    },
    sendNewMessage: message => {
      dispatch(sendNewMessage(message))
    },
    setNewMessageText: text => {
      dispatch(setNewMessageText(text))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Room)