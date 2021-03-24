import {Join} from "./Join";
import {connect} from "react-redux";
import {setJoinStatus, setLoadingStatus, setRoomId, setUserData, setUserName} from "../../redux/login.reducer";

const mapStateToProps = (state) => {
  return {
    roomId: state.login.roomId,
    userName: state.login.userName,
    isLoading: state.login.isLoading,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setRoomId: id => {
      dispatch(setRoomId(id))
    },
    setUserName: name => {
      dispatch(setUserName(name))
    },
    setUserData: userData => {
      dispatch(setUserData(userData))
    },
    setLoadingStatus: status => {
      dispatch(setLoadingStatus(status))
    },
    setJoinStatus: status => {
      dispatch(setJoinStatus(status))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Join)