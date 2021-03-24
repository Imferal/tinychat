import React from 'react';
import JoinContainer from "../Join/JoinContainer";
import RoomContainer from "../Room/RoomContainer";
import socket from "../../socket";
import './../../scss/main.scss';

function App(props) {
  // Ожидание и обработка сообщений с сервера
  React.useEffect(() => {
    // Пришло новое сообщение
    socket.on('NEW_MESSAGE', message => {
      props.sendNewMessage(message)
    })
    // Пользователь (возможно, я) присоединился к комнате
    socket.on('JOINED', data => props.setRoomData(data))
    // Изменение списка пользователей (пока только в случае дисконнекта)
    socket.on('SET_USERS', users => {
      props.setRoomUsers(users)
    })
  }, [])

  return (
    <div>
      {props.isJoined ? <RoomContainer/> : <JoinContainer/>}
    </div>
  );
}

export default App;
