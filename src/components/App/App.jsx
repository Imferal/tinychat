import React from 'react';
import s from './App.scss';
import {Join} from "../Join/Join";
import reducer from "../../reducer";
import socket from "../../socket";
import Chat from "../Chat/Chat";

function App() {
  const [state, dispatch] = React.useReducer(reducer, {
    joined: false,
    roomId: '',
    userName: '',
    users: [],
    messages: [],
  })

  const onLogin = async (loginData) => {
    // Авторизация
    dispatch({
      type: 'JOINED',
      payload: loginData,
    })
    // Подключение к комнате
    socket.emit('JOIN', loginData)
  }

  const setUsers = (users) => {
    dispatch({
      type: 'SET_USERS',
      payload: users,
    })
  }

  const addMessage = (message) => {
    dispatch({
      type: 'NEW_MESSAGE',
      payload: message,
    })
  }

  const setData = ({users, messages}) => {
    dispatch({
      type: 'SET_DATA',
      payload: {users,messages}
    })
  }

  React.useEffect(() => {
    socket.on('SET_USERS', setUsers)
    socket.on('NEW_MESSAGE', addMessage)
    socket.on('JOINED', setData)
  }, [])

  return (
    <div className={s.container}>
      {state.joined ? <Chat {...state} onAddMessage={addMessage} /> : <Join onLogin={onLogin}/>}
    </div>
  );
}

export default App;
