import React from 'react';
import s from './Join.module.scss'
import axios from "axios";

export const Join = ({onLogin}) => {
  const [roomId, setRoomId] = React.useState('');
  const [userName, setUserName] = React.useState('');
  const [isLoading, setLoading] = React.useState(false);

  const onEnter = async () => {
    if (!roomId || !userName) {
      return console.log('Оба поля должны быть заполнены')
    }
    const loginData = {
      roomId,
      userName,
    }
    setLoading(true)
    await axios
      .post('https://tinychatserver.herokuapp.com/rooms', loginData)
    onLogin(loginData)
  }

  return (
    <div className={`${s.join} "fixedContainer"`}>
      <h1>ПростоЧат</h1>
      <p className={s.join__version}><small>v.0001</small></p>
      <p className={s.join__description}>Введи название комнаты, укажи своё имя и начинай строчить мессаги в
        "ПростоЧате"!</p>
      <input className={`${s.join__input} ${s.join__input_indent}`}
             id='room'
             type='text'
             placeholder="Вводи название комнаты"
             value={roomId}
             onChange={e => setRoomId(e.target.value)}
      required/>

      <input className={s.join__input} id='name'
             type='text'
             placeholder="Придумай крутой никнейм"
             value={userName}
             onChange={e => setUserName(e.target.value)}
             required/>

      <button className={s.join__button_indent}
              type="submit"
              onClick={onEnter}
              disabled={isLoading || roomId === '' || userName === ''}>
        {isLoading ? 'заходим...' : 'начать'}
      </button>
    </div>
  )
}