const SET_USER_DATA = 'SET_USER_DATA';
const SET_ROOM_ID = 'SET_ROOM_ID';
const SET_USER_NAME = 'SET_USER_NAME';
const SET_LOADING_STATUS = 'SET_LOADING_STATUS';
const SET_JOIN_STATUS = 'SET_JOIN_STATUS';

const initialState = {
  isLoading: false,
  isJoined: false,
  roomId: '',
  userName: '',
}

export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_LOADING_STATUS' :
      return {
        ...state,
        isLoading: action.status
      }

    case 'SET_JOIN_STATUS' :
      return {
        ...state,
        isJoined: action.status
      }

    case 'SET_USER_DATA':
      return {
        ...state,
        roomId: action.userData.roomId,
        userName: action.userData.userName,
      };

    case 'SET_ROOM_ID':
      return {
        ...state,
        roomId: action.id
      };

    case 'SET_USER_NAME':
      return {
        ...state,
        userName: action.name
      };

    default:
      return state;
  }
};

export const setJoinStatus = status => ({
  type: SET_JOIN_STATUS,
  status,
})

export const setUserData = userData => ({
  type: SET_USER_DATA,
  userData,
})

export const setRoomId = id => ({
  type: SET_ROOM_ID,
  id,
})

export const setUserName = name => ({
  type: SET_USER_NAME,
  name,
})

export const setLoadingStatus = status => ({
  type: SET_LOADING_STATUS,
  status,
})
