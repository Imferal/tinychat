import React from 'react';
import s from './Join.module.scss'
import axios from "axios";
import socket from "../../socket";

export const Join = (props) => {
  const joinRoom = () => {
    // Объект для отправки данных на сервер
    const userData = {
      roomId: props.roomId,
      userName: props.userName,
    }

    // Включаем статус "загрузка"
    props.setLoadingStatus(true)
    axios
      .post('https://tinychatserver.herokuapp.com/rooms', userData)
      .then(() => {
        // Выключаем статус "загрузка"
        props.setLoadingStatus(false)
        // Устанавливаем статус подключения к чату
        props.setJoinStatus(true)
        // Сохраняем данные пользователя в стейт
        props.setUserData(userData)
        // Подключение к комнате
        socket.emit('JOIN', userData)
      })
  }

  return (
    <div className={`${s.join} "fixedContainer"`}>
      <h1>ПростоЧат</h1>
      <p className={s.join__version}><small>v.0001</small></p>
      <p className={s.join__description}>Введи название комнаты, укажи своё имя и начинай общаться в
        "ПростоЧате"!</p>
      <input className={`${s.join__input} ${s.join__input_indent}`}
             id='room'
             type='text'
             placeholder="Вводи название комнаты"
             value={props.roomId}
             onChange={e => props.setRoomId(e.target.value)}
             required/>
      <input className={s.join__input} id='name'
             type='text'
             placeholder="Придумай крутой никнейм"
             value={props.userName}
             onChange={e => props.setUserName(e.target.value)}
             required/>
      <button className={s.join__button_indent}
              type="submit"
              onClick={joinRoom}
              disabled={props.isLoading || props.roomId === '' || props.userName === ''}>
        {props.isLoading ? 'заходим...' : 'начать'}
      </button>
    </div>
  )
}